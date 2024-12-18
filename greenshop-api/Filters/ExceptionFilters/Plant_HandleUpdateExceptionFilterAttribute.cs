using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters
{
    public class Plant_HandleUpdateExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public Plant_HandleUpdateExceptionFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public override void OnException(ExceptionContext context)
        {
            base.OnException(context);

            var plantId = context.RouteData.Values["id"] as string;

            if (db.Plants.FirstOrDefault(x => x.PlantId == plantId) == null)
            {
                ModelErrors.AddNotFoundExceptionModelError(context, "PlantId", "Plant doesn't exist anymore.");
            }
        }
    }
}
