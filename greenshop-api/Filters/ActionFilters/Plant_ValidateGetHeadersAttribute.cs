using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters
{
    public class Plant_ValidateGetHeadersAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var groupHeaderValue = context.HttpContext.Request.Headers["Group"].ToString();

            var sizeHeaderValue = context.HttpContext.Request.Headers["SizeType"].ToString();

            if(!string.IsNullOrEmpty(groupHeaderValue) && 
                !string.Equals(groupHeaderValue, "new", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(groupHeaderValue, "sale", StringComparison.OrdinalIgnoreCase))
            {
                context.ModelState.AddModelError("Group", "Group is invalid.");
                var problemDetails = new ValidationProblemDetails(context.ModelState)
                {
                    Status = StatusCodes.Status400BadRequest
                };
                context.Result = new BadRequestObjectResult(problemDetails);
            }

            if (!string.IsNullOrEmpty(sizeHeaderValue) &&
                !string.Equals(sizeHeaderValue, "small", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(sizeHeaderValue, "medium", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(sizeHeaderValue, "large", StringComparison.OrdinalIgnoreCase))
            {
                context.ModelState.AddModelError("Group", "Size Type is invalid.");
                var problemDetails = new ValidationProblemDetails(context.ModelState)
                {
                    Status = StatusCodes.Status400BadRequest
                };
                context.Result = new BadRequestObjectResult(problemDetails);
            }
        }
    }
}
