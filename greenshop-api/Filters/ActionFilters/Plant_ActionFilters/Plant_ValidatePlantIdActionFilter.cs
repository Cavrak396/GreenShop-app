using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidatePlantIdActionFilter(
        ApplicationDbContext dbContext,
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;

            if (string.IsNullOrEmpty(plantId))
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "PlantId",
                    "Invalid PlantId.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }
            var plant = await _dbContext.Plants.FindAsync(plantId);
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
