using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateUpdatePlantActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidateUpdatePlantActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;
            var plant = context.ActionArguments["plant"] as PlantDto;

            if (plant == null)
            {
                BadRequestActionFilterError.Add(context, "Plant", "Plant object is not valid.");
                return;
            }

            if (!string.IsNullOrEmpty(plantId) && plant != null && plantId != plant.PlantId)
            {
                BadRequestActionFilterError.Add(context, "PlantId", "PlantId is not the same as provided id.");
                return;
            }
            
            var existingPlant = await this.db.Plants.FirstOrDefaultAsync(p =>
            !string.IsNullOrWhiteSpace(plant.Name) &&
            !string.IsNullOrWhiteSpace(p.Name) &&
            plant.Name.ToLower() == p.Name.ToLower() &&
            plant.Size == p.Size);

            if (existingPlant != null && existingPlant.PlantId != plant.PlantId)
            {
                ConflictActionFilterError.Add(context, "Plant", "Plant already exists.");
                return;
            }

            await next();
        }
    }
}
