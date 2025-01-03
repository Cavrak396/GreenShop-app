using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateGetPlantNumberFilterAttribute : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var categories = context.ActionArguments["categories"] as string[];

            if(categories == null || categories.Length == 0)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Category", "Categories must be provided.");
            }

            await next();   
        }
    }
}
