using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Authority;
using greenshop_api.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateJwtTokenActionFilter : IAsyncActionFilter
    {
        private readonly IUserRepository repository;
        private readonly JwtService jwtService;

        public User_ValidateJwtTokenActionFilter(IUserRepository repository, JwtService jwtService)
        {
            this.repository = repository;
            this.jwtService = jwtService;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];

            try
            {
                var token = jwtService.Verify(jwt!);
                var userId = token.Issuer.ToString();
                var user = await repository.GetUserByIdAsync(userId);
            }
            catch (Exception)
            {
                UnauthorizedActionFilterError.Add(context, "User", "Unauthenticated user.");
                return;
            }

            await next();
        }
    }
}
