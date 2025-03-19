using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace greenshop_api.Modules.ActionFilterErrors
{
    public static class ConflictActionFilterError
    {
        public static void Add(ActionExecutingContext context, string key, string errorMessage)
        {
            context.ModelState.AddModelError(key, errorMessage);
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = 409
            };
            context.Result = new ObjectResult(problemDetails) { StatusCode = 409 };
        }
    }
}
