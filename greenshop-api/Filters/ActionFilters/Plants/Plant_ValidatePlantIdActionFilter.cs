using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidatePlantIdActionFilter(
        IPlantsRepository plantsRepository,
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;

            var plant = await _plantsRepository.GetPlantByIdAsync(plantId!);
            if (plant == null)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "Plant",
                    "Plant does not exist.",
                    404,
                    problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }
            await next();
        }
    }
}
