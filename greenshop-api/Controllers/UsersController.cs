using greenshop_api.Application.Models;
using greenshop_api.Authority;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Newsletter;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Infrastructure.Persistance;
using greenshop_api.Infrastructure.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class UsersController(IUserRepository repository, ApplicationDbContext db, IJwtService jwtHandler, NewsletterService newsletterSender) : ControllerBase
    {
        private readonly IUserRepository repository = repository;
        private readonly ApplicationDbContext db = db;
        private readonly IJwtService jwtHandler = jwtHandler;
        private readonly INewsletterSender newsletterSender = newsletterSender;

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await this.db.Users.ToListAsync();

            return Ok(users);
        }

        [HttpPost("register")]
        [TypeFilter(typeof(User_ValidateRegisterUserActionFilter))]
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

            var foundSubscriber = await this.db.Subscribers.FirstOrDefaultAsync(s => s.SubscriberEmail == registerDto.Email);

            if(foundSubscriber != null && registerDto.IsSubscribed == false)
            {
                this.db.Subscribers.Remove(foundSubscriber);
                await this.db.SaveChangesAsync();
            }

            if (foundSubscriber == null && registerDto.IsSubscribed == true)
            {
                var subscriber = new Subscriber
                {
                    SubscriberId = Guid.NewGuid().ToString(),
                    SubscriberEmail = registerDto.Email
                };
                this.db.Subscribers.Add(subscriber);
            }

            await this.newsletterSender.SendNewsletterAsync(
                "registration",
                new NewsletterHeader
                {
                    Recipient = registerDto.Email,
                    Details = registerDto.Name
                });

            await this.repository.CreateUserAsync(user);

            return NoContent();
        }

        [HttpPost("login")]
        [TypeFilter(typeof(User_ValidateLoginUserActionFilter))]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await this.repository.GetUserByEmailAsync(loginDto.Email!);

            var jwt = jwtHandler.Generate(user.UserId!);

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
            return NoContent();
        }

        [HttpGet]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        public async Task<IActionResult> GetUser()
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtHandler.Verify(jwt!);
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

        [HttpPut("{isSubscribed}")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        //[TypeFilter(typeof(User_ValidateUpdateUserFilterAttribute))]
        public async Task<IActionResult> UpdateUserIsSubscribed(bool isSubscribed)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtHandler.Verify(jwt!);
            var userId = token.Issuer.ToString();
            var userToUpdate = await this.repository.GetUserByIdAsync(userId);

            userToUpdate.IsSubscribed = isSubscribed;

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

        [HttpDelete]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        public async Task<IActionResult> DeleteUser()
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtHandler.Verify(jwt!);
            var userId = token.Issuer.ToString();
            var userToDelete = await this.repository.GetUserByIdAsync(userId);

            this.db.Users.Remove(userToDelete);
            await this.db.SaveChangesAsync();

            Response.Cookies.Delete("jwt");

            return NoContent();
        }

        [HttpDelete("all")]
        [TypeFilter(typeof(User_ValidateDeleteUsersActionFilter))]
        public async Task<IActionResult> DeleteAllUsers()
        {
            var allUsers = await this.db.Users.ToListAsync();

            this.db.Users.RemoveRange(allUsers);
            await this.db.SaveChangesAsync();

            Response.Cookies.Delete("jwt");

            return NoContent();
        }
    }
}
