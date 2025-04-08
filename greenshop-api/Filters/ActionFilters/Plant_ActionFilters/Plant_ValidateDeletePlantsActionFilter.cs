using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateDeletePlantsActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        public Plant_ValidateDeletePlantsActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allPlants = await this.db.Plants.ToListAsync();

            if (allPlants.Count() == 0)
            {
                NotFoundActionFilterError.Add(context, "Plant", "No plants found to delete.");
                return;
            }

            await next();
        }
    }
}
