using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateDeleteUsersFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;
        public User_ValidateDeleteUsersFilterAttribute(ApplicationDbContext db)
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
