using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateUserIdFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public User_ValidateUserIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var userId = context.ActionArguments["userId"] as string;

            if (string.IsNullOrEmpty(userId))
            {
                ModelErrors.AddBadRequestActionModelError(context, "UserId", "User Id must be provided.");
            }
            else
            {
                var user = await db.Users.FindAsync(userId);
                if (user == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "UserId", "User isn't added.");
                }
            }

            await next();
        }
    }
}
