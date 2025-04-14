using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Dtos.Users;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateRegisterUserActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var registerDto = context.ActionArguments["registerDto"] as RegisterDto;

            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u =>
            !string.IsNullOrWhiteSpace(registerDto.Email) &&
            !string.IsNullOrWhiteSpace(u.UserEmail) &&
            !string.IsNullOrWhiteSpace(registerDto.Name) &&
            !string.IsNullOrWhiteSpace(u.UserName) &&
            registerDto.Email.ToLower() == u.UserEmail.ToLower() &&
            registerDto.Name == u.UserName);

            if (existingUser != null)
            {
                _actionErrorCreator.CreateActionError(
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
