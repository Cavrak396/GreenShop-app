using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateRegisterUserFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public User_ValidateRegisterUserFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var user = context.ActionArguments["dto"] as RegisterDto;
            if (user == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "User", "User object cannot be null.");
            }
            else
            {
                var existingUser = db.Users.FirstOrDefault(u =>
                !string.IsNullOrWhiteSpace(user.Email) &&
                !string.IsNullOrWhiteSpace(u.UserEmail) &&
                user.Email.ToLower() == u.UserEmail.ToLower());

                if (existingUser != null)
                {
                    ModelErrors.AddConflictActionModelError(context, "User", "User is already added.");
                }
            }
        }
    }
}
