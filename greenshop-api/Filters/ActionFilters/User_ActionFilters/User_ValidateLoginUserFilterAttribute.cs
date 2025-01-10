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
            var loginDto = context.ActionArguments["loginDto"] as LoginDto;

            if (loginDto == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "User", "User object cannot be null.");
                return;
            }

            var user = await this.db.Users.FirstOrDefaultAsync(u => u.UserEmail == loginDto.Email);
            if (user == null)
            {
                ModelErrors.AddUnauthorizedActionModelError(context, "User", "Invalid credentials.");
                return;
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.UserPassword))
            {
                ModelErrors.AddUnauthorizedActionModelError(context, "User", "Invalid credentials.");
                return;
            }

            await next();
        }
    }
}
