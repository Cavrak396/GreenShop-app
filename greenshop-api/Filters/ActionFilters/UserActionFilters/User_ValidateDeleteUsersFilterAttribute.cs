using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.UserActionFilters
{
    public class Subscriber_ValidateDeleteSubscribersFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;
        public Subscriber_ValidateDeleteSubscribersFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var allUsers = this.db.Users.ToList();

            if (allUsers.Count() == 0)
            {
                ModelErrors.AddNotFoundActionModelError(context, "User", "No users found to delete.");
            }
        }
    }
}
