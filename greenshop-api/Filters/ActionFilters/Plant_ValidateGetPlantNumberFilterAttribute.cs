using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters
{
    public class Plant_ValidateGetPlantNumberFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var categories = context.ActionArguments["categories"] as string[];

            if(categories == null || categories.Length == 0)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Category", "Categories must be provided.");
            }
        }
    }
}
