using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.UserActionFilters;
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

        public AuthController(IUserRepository repository, ApplicationDbContext db, JwtService jwtService) 
        {
            this.repository = repository;
            this.db = db;
            this.jwtService = jwtService;
        }

        [HttpPost("register")]
        [TypeFilter(typeof(User_ValidateRegisterUserFilterAttribute))]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            long identityPart = (await this.db.Users.MaxAsync(i => (long?)i.UserId % 10000) ?? 0) + 1;

            var user = new User
            {
                UserId = ApplicationDbContext.GenerateId(identityPart),
                UserName = dto.Name,
                UserEmail = dto.Email,
                UserPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            };
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

                var userId = long.Parse(token.Issuer);

                var user = await this.repository.GetUserByIdAsync(userId);

                return Ok(user);
            }
            catch (Exception ex) 
            { 
                return Unauthorized();
            }
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            var user = await this.repository.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpDelete("user/{id}")]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var userToDelete = await this.db.Users.FindAsync(id);

            this.db.Users.Remove(userToDelete);
            await this.db.SaveChangesAsync();

            Response.Cookies.Delete("jwt");

            return Ok(userToDelete);
        }
    }
}
