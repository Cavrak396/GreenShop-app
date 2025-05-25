using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Reviews;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateCreateReviewActionFilter(
        IReviewsRepository reviewsRepository,
        IActionErrorCreator actionErrorCreator,
        IJwtService jwtService) : 
        IAsyncActionFilter
    {
        private readonly IReviewsRepository _reviewsRepository = 
            reviewsRepository;
        private readonly IActionErrorCreator _actionErrorCreator = 
            actionErrorCreator;
        private readonly IJwtService _jwtService = 
            jwtService;

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var review = context
                .ActionArguments["review"] as PostReviewDto;

            var jwt = context.HttpContext.Request
                .Cookies["jwt"];
            var token = _jwtService
                .Verify(jwt!);
            var userId = token.Issuer
                .ToString();

            var existingReview = await _reviewsRepository
                .GetReviewByIdsAsync(
                userId, 
                review!.PlantId!);
            if(existingReview != null)
            {
                _actionErrorCreator
                    .CreateActionError(
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
