using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateLoginUserActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var loginDto = context.ActionArguments["loginDto"] as LoginDto;

            if (loginDto == null)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "Login",
                     "Invalid Login Data.",
                     400,
                     problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserEmail == loginDto.Email);
            if (user == null)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "User",
                     "Invalid Credentials.",
                     401,
                     problemDetails => new UnauthorizedObjectResult(problemDetails));
                return;
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.UserPassword))
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "User",
                     "Invalid Credentials.",
                     401,
                     problemDetails => new UnauthorizedObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
