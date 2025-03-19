using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace greenshop_api.Modules.ActionFilterErrors
{
    public static class NotFoundActionFilterError
    {
        public static void Add(ActionExecutingContext context, string key, string errorMessage)
        {
            context.ModelState.AddModelError(key, errorMessage);
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = StatusCodes.Status404NotFound
            };
            context.Result = new NotFoundObjectResult(problemDetails);
        }
    }
}
