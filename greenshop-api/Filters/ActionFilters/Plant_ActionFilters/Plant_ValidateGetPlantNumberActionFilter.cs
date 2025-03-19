using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateGetPlantNumberActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var categories = context.ActionArguments["categories"] as string[];

            if(categories == null || categories.Length == 0)
            {
                BadRequestActionFilterError.Add(context, "Category", "Categories are not valid.");
                return;
            }

            await next();   
        }
    }
}
