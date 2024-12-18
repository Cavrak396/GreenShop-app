using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.UserActionFilters
{
    public class User_ValidateUserIdFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public User_ValidateUserIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var userId = context.ActionArguments["id"] as string;
            if (string.IsNullOrEmpty(userId))
            {
                ModelErrors.AddBadRequestActionModelError(context, "UserId", "User Id must be provided.");
            }
            else
            {
                var user = db.Users.Find(userId);
                if (user == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "UserId", "User isn't added.");
                }
            }
        }
    }
}
