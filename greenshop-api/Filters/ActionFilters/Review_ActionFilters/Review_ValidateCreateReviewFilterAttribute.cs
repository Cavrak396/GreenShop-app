using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateCreateReviewFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        private readonly IUserRepository repository;
        private readonly JwtService jwtService;

        public Review_ValidateCreateReviewFilterAttribute(ApplicationDbContext db, IUserRepository repository, JwtService jwtService)
        {
            this.db = db;
            this.repository = repository;
            this.jwtService = jwtService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var review = context.ActionArguments["review"] as ReviewDto;

            if (review == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Review", "Review object cannot be null.");
                return;
            }

            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();

            var existingReview = await this.db.Reviews.FindAsync(userId, review.PlantId);
            if(existingReview != null)
            {
                ModelErrors.AddConflictActionModelError(context, "Review", "Review is already added.");
                return;
            }

            await next();
        }
    }
}
