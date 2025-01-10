using greenshop_api.Data;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateUpdatePlantFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidateUpdatePlantFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;
            var plant = context.ActionArguments["plant"] as PlantDto;

            if (plant == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Plant", "Plant object cannot be null.");
                return;
            }

            if (!string.IsNullOrEmpty(plantId) && plant != null && plantId != plant.PlantId)
            {
                ModelErrors.AddBadRequestActionModelError(context, "PlantId", "Plant Id is not the same as provided id.");
                return;
            }
            
            var existingPlant = await this.db.Plants.FirstOrDefaultAsync(p =>
            !string.IsNullOrWhiteSpace(plant.Name) &&
            !string.IsNullOrWhiteSpace(p.Name) &&
            plant.Name.ToLower() == p.Name.ToLower() &&
            plant.Size == p.Size);

            if (existingPlant != null && existingPlant.PlantId != plant.PlantId)
            {
                ModelErrors.AddConflictActionModelError(context, "Plant", "Plant already exists.");
                return;
            }

            await next();
        }
    }
}
