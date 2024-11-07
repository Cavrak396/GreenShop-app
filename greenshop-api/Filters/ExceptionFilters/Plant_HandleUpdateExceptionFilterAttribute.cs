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

            var idString = context.RouteData.Values["id"] as string;
            if (int.TryParse(idString, out int plantId))
            {
                if (db.Plants.FirstOrDefault(x => x.PlantId == plantId) == null)
                {
                    context.ModelState.AddModelError("PlantId", "Plant doesn't exist anymore.");
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Status = StatusCodes.Status404NotFound
                    };
                    context.Result = new NotFoundObjectResult(problemDetails);
                }
            }
        }
    }
}
