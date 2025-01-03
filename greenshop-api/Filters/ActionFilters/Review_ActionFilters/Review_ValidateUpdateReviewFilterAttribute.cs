using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateUpdateReviewFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Review_ValidateUpdateReviewFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;
            var userId = context.ActionArguments["userId"] as string;
            var review = context.ActionArguments["review"] as Review;

            if (!string.IsNullOrEmpty(plantId) && review != null && plantId != review.PlantId)
            {
                ModelErrors.AddBadRequestActionModelError(context, "PlantId", "Plant Id is not the same as provided id.");
            }
            if (!string.IsNullOrEmpty(userId) && review != null && userId != review.UserId)
            {
                ModelErrors.AddBadRequestActionModelError(context, "UserId", "User Id is not the same as provided id.");
            }

            await next();
        }
    }
}
