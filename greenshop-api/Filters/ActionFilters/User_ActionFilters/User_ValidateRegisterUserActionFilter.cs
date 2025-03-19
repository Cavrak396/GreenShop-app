using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateRegisterUserActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public User_ValidateRegisterUserActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var registerDto = context.ActionArguments["registerDto"] as RegisterDto;

            if (registerDto == null)
            {
                BadRequestActionFilterError.Add(context, "Register", "Register data is not valid.");
                return;
            }

            var existingUser = await db.Users.FirstOrDefaultAsync(u =>
            !string.IsNullOrWhiteSpace(registerDto.Email) &&
            !string.IsNullOrWhiteSpace(u.UserEmail) &&
            !string.IsNullOrWhiteSpace(registerDto.Name) &&
            !string.IsNullOrWhiteSpace(u.UserName) &&
            registerDto.Email.ToLower() == u.UserEmail.ToLower() &&
            registerDto.Name == u.UserName);

            if (existingUser != null)
            {
                ConflictActionFilterError.Add(context, "User", "User is already added.");
                return;
            }

            await next();
        }
    }
}
