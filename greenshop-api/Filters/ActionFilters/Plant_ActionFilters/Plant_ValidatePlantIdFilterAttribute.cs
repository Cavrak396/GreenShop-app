using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidatePlantIdFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidatePlantIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var plantId = context.ActionArguments["id"] as long?;
            if (!plantId.HasValue)
            {
                ModelErrors.AddBadRequestActionModelError(context, "PlantId", "Plant Id must be provided.");
            }
            else
            {
                var plant = db.Subscribers.Find(plantId);
                if (plant == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "PlantId", "Plant doesn't exist.");
                }
            }
        }
    }
}
