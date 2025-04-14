using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateCreateReviewActionFilter(
        ApplicationDbContext dbContext,
        IActionErrorCreator actionErrorCreator,
        IJwtService jwtService) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;
        private readonly IJwtService _jwtService = jwtService;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var review = context.ActionArguments["review"] as ReviewDto;

            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var existingReview = await _dbContext.Reviews.FindAsync(userId, review.PlantId);
            if(existingReview != null)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "Review",
                     "Review is already added.",
                     409,
                     problemDetails => new ConflictObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
