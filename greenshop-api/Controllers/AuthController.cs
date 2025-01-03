using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Models;
using greenshop_api.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository repository;
        private readonly ApplicationDbContext db;
        private readonly JwtService jwtService;
        private readonly NewsettlerService newsettlerService;

        public AuthController(IUserRepository repository, ApplicationDbContext db, JwtService jwtService, NewsettlerService newsettlerService) 
        {
            this.repository = repository;
            this.db = db;
            this.jwtService = jwtService;
            this.newsettlerService = newsettlerService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetSubscribers()
        {
            var users = await this.db.Users.ToListAsync();

            return Ok(users);
        }

        [HttpPost("register")]
        [TypeFilter(typeof(User_ValidateRegisterUserFilterAttribute))]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                UserName = dto.Name,
                UserEmail = dto.Email,
                UserPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                IsSubscribed = dto.IsSubscribed
            };

            if(dto.IsSubscribed == true)
            {
                var foundSubscriber = await this.db.Subscribers.FirstOrDefaultAsync(s => s.SubscriberEmail == dto.Email);
                if (foundSubscriber == null)
                {
                    var subscriber = new Subscriber
                    {
                        SubscriberId = Guid.NewGuid().ToString(),
                        SubscriberEmail = dto.Email
                    };
                    this.db.Subscribers.Add(subscriber);
                    await this.db.SaveChangesAsync();
                }
            }

            await newsettlerService.SendNewsettlerMessage(
                dto.Email,
                "You successfully joined Miso Greenshop family!",
                $"Hello, {dto.Name}, your register proccess was successfull!",
                "Now you can login and shop all your favorite products " +
                "for awesome prices! You can also leave reviews for the " +
                "the products you purchased and many other features!"
            );

            await this.repository.CreateUserAsync(user);

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        [HttpPost("login")]
        [TypeFilter(typeof(User_ValidateLoginUserFilterAttribute))]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await this.repository.GetUserByEmailAsync(dto.Email);

            var jwt = jwtService.Generate(user.UserId);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                Jwt = jwt
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await Task.CompletedTask;
            Response.Cookies.Delete("jwt");
            return Ok();
        }

        [HttpGet("user")]
        [EnableCors("WithCredentialsPolicy")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                var userId = token.Issuer.ToString();

                var user = await this.repository.GetUserByIdAsync(userId);

                return Ok(user);
            }
            catch (Exception ex) 
            { 
                return Unauthorized();
            }
        }

        [HttpGet("users/{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var user = await this.repository.GetUserByIdAsync(userId);
            return Ok(user);
        }

        [HttpDelete("users/{userId}")]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var userToDelete = await this.db.Users.FindAsync(userId);

            this.db.Users.Remove(userToDelete);
            await this.db.SaveChangesAsync();

            Response.Cookies.Delete("jwt");

            return Ok(userToDelete);
        }

        [HttpDelete("users")]
        [TypeFilter(typeof(Subscriber_ValidateDeleteSubscribersFilterAttribute))]
        public async Task<IActionResult> DeleteAllUsers()
        {
            var allUsers = await this.db.Users.ToListAsync();

            this.db.Users.RemoveRange(allUsers);
            await this.db.SaveChangesAsync();

            Response.Cookies.Delete("jwt");

            return Ok(allUsers);
        }
    }
}
