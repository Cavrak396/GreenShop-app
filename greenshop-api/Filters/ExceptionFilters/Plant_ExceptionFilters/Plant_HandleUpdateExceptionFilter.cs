using greenshop_api.Application.Modules.ExceptionFilterErrors;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Plant_ExceptionFilters
{
    public class Plant_HandleUpdateExceptionFilter : IAsyncExceptionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_HandleUpdateExceptionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var plantId = context.RouteData.Values["plantId"] as string;

            if (await db.Plants.FindAsync(plantId) == null)
            {
                NotFoundExceptionFilterError.Add(context, "PlantId", "Plant doesn't exist anymore.");
            }
        }
    }
}
