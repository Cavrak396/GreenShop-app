using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateUpdateReviewActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;

            var review = context.ActionArguments["review"] as ReviewDto;

            if (!string.IsNullOrEmpty(plantId) && review != null && plantId != review.PlantId)
            {
                BadRequestActionFilterError.Add(context, "PlantId", "PlantId is not the same as provided id.");
                return;
            }

            await next();
        }
    }
}
