using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateDeletePlantsFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        public Plant_ValidateDeletePlantsFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allPlants = await this.db.Plants.ToListAsync();

            if (allPlants.Count() == 0)
            {
                ModelErrors.AddNotFoundActionModelError(context, "Plant", "No plants found to delete.");
                return;
            }

            await next();
        }
    }
}
