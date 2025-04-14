using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Dtos;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateCreatePlantActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plant = context.ActionArguments["plant"] as PlantDto;

            var existingPlant = await _dbContext.Plants.FirstOrDefaultAsync(p =>
            !string.IsNullOrWhiteSpace(plant!.Name) &&
            !string.IsNullOrWhiteSpace(p.Name) &&
            plant.Name.ToLower() == p.Name.ToLower() &&
            plant.Size == p.Size);

            if (existingPlant != null)
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
