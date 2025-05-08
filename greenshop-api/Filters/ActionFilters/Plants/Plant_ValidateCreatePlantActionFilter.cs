using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Plants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateCreatePlantActionFilter(
        IPlantsRepository plantsRepository, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plant = context.ActionArguments["plant"] as PostPlantDto;

            var existingPlant = await _plantsRepository.GetPlantByNameAndSizeAsync(plant!.Name!, plant.Size);

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
