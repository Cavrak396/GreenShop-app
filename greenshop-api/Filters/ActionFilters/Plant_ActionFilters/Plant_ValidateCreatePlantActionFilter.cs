using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateCreatePlantActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidateCreatePlantActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plant = context.ActionArguments["plant"] as PlantDto;

            if (plant == null)
            {
                BadRequestActionFilterError.Add(context, "Plant", "Plant object is not valid.");
                return;
            }

            var existingPlant = await db.Plants.FirstOrDefaultAsync(p =>
            !string.IsNullOrWhiteSpace(plant.Name) &&
            !string.IsNullOrWhiteSpace(p.Name) &&
            plant.Name.ToLower() == p.Name.ToLower() &&
            plant.Size == p.Size);

            if (existingPlant != null)
            {
                ConflictActionFilterError.Add(context, "Plant", "Plant already exists.");
                return;
            }

            await next();
        }
    }
}
