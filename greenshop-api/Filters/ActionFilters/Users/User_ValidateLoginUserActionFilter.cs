using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateLoginUserActionFilter(
        IUsersRepository usersRepository, 
        IActionErrorCreator actionErrorCreator) : 
        IAsyncActionFilter
    {
        private readonly IUsersRepository _usersRepository = 
            usersRepository;
        private readonly IActionErrorCreator _actionErrorCreator = 
            actionErrorCreator;

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var loginDto = context
                .ActionArguments["loginDto"] as LoginDto;

            var user = await _usersRepository
                .GetUserByEmailAsync(loginDto!.Email!);
            if (user == null)
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "User",
                    "Invalid Credentials.",
                    401,
                    problemDetails => new UnauthorizedObjectResult(problemDetails));
                
                return;
            }

            if (!BCrypt.Net.BCrypt
                .Verify(
                loginDto!.Password, 
                user.UserPassword))
            {
                _actionErrorCreator
                    .CreateActionError(
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
