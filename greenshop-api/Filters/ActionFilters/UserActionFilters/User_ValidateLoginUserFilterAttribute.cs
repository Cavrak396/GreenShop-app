using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.UserActionFilters
{
    public class User_ValidateLoginUserFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;
        private readonly IUserRepository repository;

        public User_ValidateLoginUserFilterAttribute(ApplicationDbContext db, IUserRepository repository)
        {
            this.db = db;
            this.repository = repository;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var userDto = context.ActionArguments["dto"] as LoginDto;
            if (userDto == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "User", "User object cannot be null.");
            }
            else
            {
                var user = this.db.Users.FirstOrDefault(u => u.UserEmail == userDto.Email);

                if (user == null)
                {
                    ModelErrors.AddUnauthorizedActionModelError(context, "User", "Invalid credentials.");
                }
                else
                {
                    if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.UserPassword))
                    {
                        ModelErrors.AddUnauthorizedActionModelError(context, "User", "Invalid credentials.");
                    }
                }
            }
        }
    }
}
