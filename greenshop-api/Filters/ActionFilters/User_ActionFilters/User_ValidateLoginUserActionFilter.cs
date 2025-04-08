using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateLoginUserActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public User_ValidateLoginUserActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var loginDto = context.ActionArguments["loginDto"] as LoginDto;

            if (loginDto == null)
            {
                BadRequestActionFilterError.Add(context, "Login", "Login data is not valid.");
                return;
            }

            var user = await this.db.Users.FirstOrDefaultAsync(u => u.UserEmail == loginDto.Email);
            if (user == null)
            {
                UnauthorizedActionFilterError.Add(context, "User", "Invalid credentials.");
                return;
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.UserPassword))
            {
                UnauthorizedActionFilterError.Add(context, "User", "Invalid credentials.");
                return;
            }

            await next();
        }
    }
}
