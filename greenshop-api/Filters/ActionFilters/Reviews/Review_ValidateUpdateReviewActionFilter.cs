using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Dtos.Reviews;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateUpdateReviewActionFilter(IActionErrorCreator actionErrorCreator) : 
        IAsyncActionFilter
    {
        private readonly IActionErrorCreator _actionErrorCreator = 
            actionErrorCreator;

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var plantId = context
                .ActionArguments["plantId"] as string;

            var review = context
                .ActionArguments["review"] as PostReviewDto;

            if (plantId != review!.PlantId)
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "PlantId",
                    "PlantId is not the same as provided Id.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));
                
                return;
            }

            await next();
        }
    }
}
