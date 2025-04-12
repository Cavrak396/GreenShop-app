using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateUpdatePlantActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;
            var plant = context.ActionArguments["plant"] as PlantDto;

            if (plant == null)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "Plant",
                    "Invalid Plant.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }

            if (!string.IsNullOrEmpty(plantId) && plant != null && plantId != plant.PlantId)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "PlantId",
                    "PlantId is not the same as the provided id.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }
            
            var existingPlant = await _dbContext.Plants.FirstOrDefaultAsync(p =>
            !string.IsNullOrWhiteSpace(plant!.Name) &&
            !string.IsNullOrWhiteSpace(p.Name) &&
            plant.Name.ToLower() == p.Name.ToLower() &&
            plant.Size == p.Size);

            if (existingPlant != null && existingPlant.PlantId != plant!.PlantId)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "Plant",
                    "Plant already exists.",
                    409,
                    problemDetails => new ConflictObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
