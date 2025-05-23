using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateRegisterUserActionFilter(
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
            var registerDto = context
                .ActionArguments["registerDto"] as RegisterDto;

            var existingUser = await _usersRepository
                .GetUserByEmailAsync(registerDto!.Email!);

            if (existingUser != null)
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "User",
                    "User is already added.",
                    409,
                    problemDetails => new ConflictObjectResult(problemDetails));
                
                return;
            }

            await next();
        }
    }
}
