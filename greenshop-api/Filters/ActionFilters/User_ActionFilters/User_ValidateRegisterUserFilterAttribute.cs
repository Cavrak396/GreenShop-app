using greenshop_api.Data;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateRegisterUserFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public User_ValidateRegisterUserFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var user = context.ActionArguments["dto"] as RegisterDto;

            if (user == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "User", "User object cannot be null.");
                return;
            }
            else
            {
                var existingUser = await db.Users.FirstOrDefaultAsync(u =>
                !string.IsNullOrWhiteSpace(user.Email) &&
                !string.IsNullOrWhiteSpace(u.UserEmail) &&
                user.Email.ToLower() == u.UserEmail.ToLower());

                if (existingUser != null)
                {
                    ModelErrors.AddConflictActionModelError(context, "User", "User is already added.");
                    return;
                }
            }

            await next();
        }
    }
}
