using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateReviewIdFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Review_ValidateReviewIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;
            var userId = context.ActionArguments["userId"] as string;

            var review = await this.db.Reviews.FindAsync(userId, plantId);
            if (review == null)
            {
                ModelErrors.AddNotFoundActionModelError(context, "Review", "Review isn't added.");
            }

            await next();
        }
    }
}
