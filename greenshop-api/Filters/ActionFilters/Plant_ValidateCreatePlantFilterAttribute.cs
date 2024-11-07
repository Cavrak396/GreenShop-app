using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters
{
    public class Plant_ValidateCreatePlantFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public Plant_ValidateCreatePlantFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var plant = context.ActionArguments["plant"] as Plant;
            if (plant == null)
            {
                context.ModelState.AddModelError("Plant", "Plant object cannot be null.");

                var problemDetails = new ValidationProblemDetails(context.ModelState)
                {
                    Status = StatusCodes.Status400BadRequest
                };
                context.Result = new BadRequestObjectResult(problemDetails);
                return;
            }
            else
            {
                var existingPlant = db.Plants.FirstOrDefault(p =>
                !string.IsNullOrWhiteSpace(plant.Name) &&
                !string.IsNullOrWhiteSpace(p.Name) &&
                plant.Name.ToLower() == p.Name.ToLower() &&
                plant.Size == p.Size);

                if (existingPlant != null)
                {
                    context.ModelState.AddModelError("Plant", "Plant already exists.");
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest
                    };
                    context.Result = new BadRequestObjectResult(problemDetails);
                }
            }
        }
    }
}
