using greenshop_api.Data;
using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateDeleteUsersActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        public User_ValidateDeleteUsersActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allUsers = await this.db.Users.ToListAsync();

            if (allUsers.Count() == 0)
            {
                NotFoundActionFilterError.Add(context, "User", "No users found to delete.");
                return;
            }

            await next();
        }
    }
}
