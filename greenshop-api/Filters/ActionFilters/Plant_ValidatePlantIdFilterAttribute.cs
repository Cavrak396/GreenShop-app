using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters
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
            if (plantId.HasValue)
            {
                if (plantId.Value <= 0)
                {
                    ModelErrors.AddBadRequestActionModelError(context, "PlantId", "Plant Id is invalid");
                }
                else
                {
                    var plant = db.Plants.Find(plantId.Value);
                    if (plant == null)
                    {
                        ModelErrors.AddNotFoundActionModelError(context, "PlantId", "Plant doesn't exist.");
                    }
                }
            }
        }
    }
}
