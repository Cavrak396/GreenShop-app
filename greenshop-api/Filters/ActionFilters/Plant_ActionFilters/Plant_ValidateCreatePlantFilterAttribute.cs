using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateCreatePlantFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidateCreatePlantFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plant = context.ActionArguments["plant"] as Plant;

            if (plant == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Plant", "Plant object cannot be null.");
                return;
            }
            else
            {
                var existingPlant = await db.Plants.FirstOrDefaultAsync(p =>
                !string.IsNullOrWhiteSpace(plant.Name) &&
                !string.IsNullOrWhiteSpace(p.Name) &&
                plant.Name.ToLower() == p.Name.ToLower() &&
                plant.Size == p.Size);

                if (existingPlant != null)
                {
                    ModelErrors.AddConflictActionModelError(context, "Plant", "Plant already exists.");
                    return;
                }
            }

            await next();
        }
    }
}
