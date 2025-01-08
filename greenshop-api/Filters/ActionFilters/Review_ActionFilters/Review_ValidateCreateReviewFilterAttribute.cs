using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateCreateReviewFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Review_ValidateCreateReviewFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var review = context.ActionArguments["review"] as Review;

            if (review == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Review", "Review object cannot be null.");
                return;
            }
            else
            {
                var user = await this.db.Users.FindAsync(review.UserId);
                var plant = await this.db.Plants.FindAsync(review.PlantId);
                if(user == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "User", "User isn't added.");
                    return;
                }
                if (plant == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "Plant", "Plant doesn't exist.");
                    return;
                }

                var existingReview = await this.db.Reviews.FindAsync(review.UserId, review.PlantId);
                if(existingReview == null)
                {
                    ModelErrors.AddConflictActionModelError(context, "Review", "Review is already added.");
                    return;
                }
            }

            await next();
        }
    }
}
