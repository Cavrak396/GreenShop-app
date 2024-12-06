using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.UserActionFilters;
using greenshop_api.Models;
using greenshop_api.Services;
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
        public IActionResult Register(RegisterDto dto)
        {
            long identityPart = (this.db.Users.Max(i => (long?)i.UserId % 10000) ?? 0) + 1;

            var user = new User
            {
                UserId = ApplicationDbContext.GenerateId(identityPart),
                UserName = dto.Name,
                UserEmail = dto.Email,
                UserPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            };

            repository.CreateUser(user);

            return Created("success", repository.CreateUser(user));
        }

        [HttpPost("login")]
        [TypeFilter(typeof(User_ValidateLoginUserFilterAttribute))]
        public IActionResult Login(LoginDto dto)
        {
            var user = repository.GetUserByEmail(dto.Email);

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
        //maybe add check if user is logged in
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok();
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                var userId = long.Parse(token.Issuer);

                var user = repository.GetUserById(userId);

                return Ok(user);
            }
            catch (Exception ex) 
            { 
                return Unauthorized();
            }
        }

        [HttpDelete("user/{id}")]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        public IActionResult DeleteUser(long id)
        {
            var userToDelete = this.db.Users.Find(id);

            db.Users.Remove(userToDelete);
            db.SaveChanges();

            return Ok(userToDelete);
        }
    }
}
