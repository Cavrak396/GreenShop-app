using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateReviewExistsActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator, 
        IJwtService jwtService) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;
        private readonly IJwtService _jwtService = jwtService;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var plantId = context.ActionArguments["plantId"] as string;

            var review = await _dbContext.Reviews.FindAsync(userId, plantId);
            if (review == null)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "Review",
                     "Review is not added.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
