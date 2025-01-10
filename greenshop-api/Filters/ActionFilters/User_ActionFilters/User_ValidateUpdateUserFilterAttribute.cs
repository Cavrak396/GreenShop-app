using greenshop_api.Data;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateUpdateUserFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public User_ValidateUpdateUserFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var user = context.ActionArguments["user"] as UserDto;

            if (user == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "User", "User object cannot be null.");
                return;
            }

            var existingUser = await this.db.Users.FirstOrDefaultAsync(u =>
            !string.IsNullOrWhiteSpace(user.UserEmail) &&
            !string.IsNullOrWhiteSpace(u.UserEmail) &&
            !string.IsNullOrWhiteSpace(user.UserName) &&
            !string.IsNullOrWhiteSpace(u.UserName) &&
            user.UserEmail.ToLower() == u.UserEmail.ToLower() &&
            user.UserName == u.UserName);

            if (existingUser != null)
            {
                ModelErrors.AddConflictActionModelError(context, "User", "User is already added.");
                return;
            }

            await next();
        }
    }
}
