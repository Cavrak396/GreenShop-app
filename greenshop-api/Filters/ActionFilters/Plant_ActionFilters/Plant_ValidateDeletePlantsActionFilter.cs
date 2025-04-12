using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateDeletePlantsActionFilter(
        ApplicationDbContext dbContext,
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allPlants = await _dbContext.Plants.ToListAsync();

            if (allPlants.Count == 0)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "Plant",
                    "No Plants found to delete.",
                    404,
                    problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
