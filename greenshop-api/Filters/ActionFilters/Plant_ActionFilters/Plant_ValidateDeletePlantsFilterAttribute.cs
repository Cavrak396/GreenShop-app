using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateDeletePlantsFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;
        public Plant_ValidateDeletePlantsFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var allPlants = this.db.Plants.ToList();

            if (allPlants.Count() == 0)
            {
                ModelErrors.AddNotFoundActionModelError(context, "Plant", "No plants found to delete.");
            }
        }
    }
}
