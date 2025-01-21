using greenshop_api.Authority;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateJwtTokenFilterAttribute : IAsyncActionFilter
    {
        private readonly IUserRepository repository;
        private readonly JwtService jwtService;

        public Review_ValidateJwtTokenFilterAttribute(IUserRepository repository, JwtService jwtService)
        {
            this.repository = repository;
            this.jwtService = jwtService;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];

            if (!string.IsNullOrEmpty(jwt))
            {
                try
                {
                    var token = jwtService.Verify(jwt);
                    var userId = token.Issuer.ToString();
                    var user = await repository.GetUserByIdAsync(userId);
                }
                catch (Exception)
                {
                    ModelErrors.AddUnauthorizedActionModelError(context, "User", "Unauthenticated user.");
                    return;
                }
            }

            await next();
        }
    }
}
