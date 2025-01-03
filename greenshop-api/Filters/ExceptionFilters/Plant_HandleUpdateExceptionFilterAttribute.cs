using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ExceptionFilters
{
    public class Plant_HandleUpdateExceptionFilterAttribute : IAsyncExceptionFilter
    {
        private readonly ApplicationDbContext db;

        public Plant_HandleUpdateExceptionFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var plantId = context.RouteData.Values["id"] as string;

            if (await db.Plants.FirstOrDefaultAsync(p => p.PlantId == plantId) == null)
            {
                ModelErrors.AddNotFoundExceptionModelError(context, "PlantId", "Plant doesn't exist anymore.");
            }
        }
    }
}
