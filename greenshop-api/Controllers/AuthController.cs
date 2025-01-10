using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
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
        private readonly NewsletterService newsletterService;

        public AuthController(IUserRepository repository, ApplicationDbContext db, JwtService jwtService, NewsletterService newsletterService) 
        {
            this.repository = repository;
            this.db = db;
            this.jwtService = jwtService;
            this.newsletterService = newsletterService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await this.db.Users.ToListAsync();

            return Ok(users);
        }

        [HttpPost("register")]
        [TypeFilter(typeof(User_ValidateRegisterUserFilterAttribute))]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                UserName = registerDto.Name,
                UserEmail = registerDto.Email,
                UserPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                IsSubscribed = registerDto.IsSubscribed
            };

            if(registerDto.IsSubscribed == true)
            {
                var foundSubscriber = await this.db.Subscribers.FirstOrDefaultAsync(s => s.SubscriberEmail == registerDto.Email);
                if (foundSubscriber == null)
                {
                    var subscriber = new Subscriber
                    {
                        SubscriberId = Guid.NewGuid().ToString(),
                        SubscriberEmail = registerDto.Email
                    };
                    this.db.Subscribers.Add(subscriber);
                    await this.db.SaveChangesAsync();
                }
            }

            await newsletterService.SendNewsletterMessage(
                registerDto.Email,
                "You successfully joined Miso Greenshop family!",
                $"Hello, {registerDto.Name}, your register proccess was successfull!",
                "Now you can login and shop all your favorite products " +
                "for awesome prices! You can also leave reviews for the " +
                "the products you purchased and many other features!"
            );

            await this.repository.CreateUserAsync(user);

            return Ok();
        }

        [HttpPost("login")]
        [TypeFilter(typeof(User_ValidateLoginUserFilterAttribute))]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await this.repository.GetUserByEmailAsync(loginDto.Email);

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
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        public async Task<IActionResult> GetUser()
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();
            var user = await this.repository.GetUserByIdAsync(userId);

            var userDto = new UserDto
            {
                UserEmail = user.UserEmail,
                UserName = user.UserName,
                IsSubscribed = user.IsSubscribed,
            };

            return Ok(userDto);
        }

        [HttpPut("user")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto user)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();
            var userToUpdate = await this.repository.GetUserByIdAsync(userId);

            userToUpdate.UserName = user.UserName ?? user.UserName;
            userToUpdate.IsSubscribed = user.IsSubscribed;

            var subscriber = await this.db.Subscribers.FirstOrDefaultAsync(s => s.SubscriberEmail == userToUpdate.UserEmail);

            if (userToUpdate.IsSubscribed && subscriber == null)
            {
                if (subscriber == null)
                {
                    var subscriberToCreate = new Subscriber
                    {
                        SubscriberId = Guid.NewGuid().ToString(),
                        SubscriberEmail = userToUpdate.UserEmail
                    };
                    this.db.Subscribers.Add(subscriberToCreate);
                }
            }
            else if(!userToUpdate.IsSubscribed && subscriber != null)
            {
                 this.db.Subscribers.Remove(subscriber);
            }

            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("user")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        public async Task<IActionResult> DeleteUser()
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();
            var userToDelete = await this.repository.GetUserByIdAsync(userId);

            this.db.Users.Remove(userToDelete);
            await this.db.SaveChangesAsync();

            Response.Cookies.Delete("jwt");

            return Ok();
        }

        [HttpDelete("users")]
        [TypeFilter(typeof(User_ValidateDeleteUsersFilterAttribute))]
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
