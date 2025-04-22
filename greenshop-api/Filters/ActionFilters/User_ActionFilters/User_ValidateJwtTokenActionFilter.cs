using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateJwtTokenActionFilter(
        IUsersRepository usersRepository, 
        IActionErrorCreator actionErrorCreator, 
        IJwtService jwtService) : IAsyncActionFilter
    {
        private readonly IUsersRepository _usersRepository = usersRepository;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;
        private readonly IJwtService _jwtService = jwtService;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];

            try
            {
                var token = _jwtService.Verify(jwt!);
                var userId = token.Issuer.ToString();
                var user = await _usersRepository.GetUserByIdAsync(userId);
            }
            catch (Exception)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "User",
                     "Unauthenticated User.",
                     401,
                     problemDetails => new UnauthorizedObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
