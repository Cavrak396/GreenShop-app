using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateJwtTokenFilterAttribute : IAsyncActionFilter
    {
        private readonly IUserRepository repository;
        private readonly JwtService jwtService;

        public User_ValidateJwtTokenFilterAttribute(IUserRepository repository, JwtService jwtService)
        {
            this.repository = repository;
            this.jwtService = jwtService;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            try
            {
                var jwt = context.HttpContext.Request.Cookies["jwt"];
                var token = jwtService.Verify(jwt);
                var userId = token.Issuer.ToString();
                var user = await repository.GetUserByIdAsync(userId);

                await next();
            }
            catch (Exception)
            {
                ModelErrors.AddUnauthorizedActionModelError(context, "User", "Unauthenticated user.");
                return;
            }
        }
    }
}
