using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidatePlantIdActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidatePlantIdActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;

            if (string.IsNullOrEmpty(plantId))
            {
                BadRequestActionFilterError.Add(context, "PlantId", "PlantId is not valid.");
                return;
            }

            var plant = await db.Plants.FindAsync(plantId);
            if (plant == null)
            {
                NotFoundActionFilterError.Add(context, "Plant", "Plant doesn't exist.");
                return;
            }

            await next();
        }
    }
}
