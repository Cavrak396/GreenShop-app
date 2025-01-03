using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateDeleteUsersFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        public User_ValidateDeleteUsersFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allUsers = await this.db.Users.ToListAsync();

            if (allUsers.Count() == 0)
            {
                ModelErrors.AddNotFoundActionModelError(context, "User", "No users found to delete.");
            }

            await next();
        }
    }
}
