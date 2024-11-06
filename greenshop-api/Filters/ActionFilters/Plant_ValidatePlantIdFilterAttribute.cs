using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters
{
    public class Plant_ValidatePlantIdFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidatePlantIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var plantId = context.ActionArguments["id"] as long?;
            if (plantId.HasValue)
            {
                if (plantId.Value <= 0)
                {
                    context.ModelState.AddModelError("PlantId", "Plant Id is invalid");
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest
                    };
                    context.Result = new BadRequestObjectResult(problemDetails);
                }
                else
                {
                    var plant = db.Plants.Find(plantId.Value);
                    if (plant == null)
                    {
                        context.ModelState.AddModelError("PlantId", "Plant doesn't exist.");
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
}
