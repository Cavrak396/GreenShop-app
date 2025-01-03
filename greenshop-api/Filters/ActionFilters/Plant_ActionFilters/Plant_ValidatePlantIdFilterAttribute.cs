using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidatePlantIdFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidatePlantIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;

            if (string.IsNullOrEmpty(plantId))
            {
                ModelErrors.AddBadRequestActionModelError(context, "PlantId", "Plant Id must be provided.");
            }
            else
            {
                var plant = await db.Plants.FirstOrDefaultAsync(p => p.PlantId == plantId);
                if (plant == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "PlantId", "Plant doesn't exist.");
                }
            }

            await next();
        }
    }
}
