using greenshop_api.Data;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateLoginUserFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public User_ValidateLoginUserFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userDto = context.ActionArguments["dto"] as LoginDto;

            if (userDto == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "User", "User object cannot be null.");
                return;
            }
            else
            {
                var user = await this.db.Users.FirstOrDefaultAsync(u => u.UserEmail == userDto.Email);
                if (user == null)
                {
                    ModelErrors.AddUnauthorizedActionModelError(context, "User", "Invalid credentials.");
                    return;
                }
                else
                {
                    if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.UserPassword))
                    {
                        ModelErrors.AddUnauthorizedActionModelError(context, "User", "Invalid credentials.");
                        return;
                    }
                }
            }

            await next();
        }
    }
}
