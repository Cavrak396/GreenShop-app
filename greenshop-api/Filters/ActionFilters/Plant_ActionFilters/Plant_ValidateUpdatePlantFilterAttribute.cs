using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateUpdatePlantFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var id = context.ActionArguments["id"] as int?;
            var shirt = context.ActionArguments["plant"] as Plant;

            if (id.HasValue && shirt != null && id != shirt.PlantId)
            {
                ModelErrors.AddBadRequestActionModelError(context, "PlantId", "Plant Id is not the same as provided id.");
            }
        }
    }
}
