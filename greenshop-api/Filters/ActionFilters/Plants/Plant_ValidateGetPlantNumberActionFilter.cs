using greenshop_api.Domain.Interfaces.Creators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateGetPlantNumberActionFilter(IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var categories = context.ActionArguments["categories"] as List<string>;

            if(categories?.Count == 0)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "Category",
                    "Category List is empty.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }

            await next();   
        }
    }
}
