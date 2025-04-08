using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace greenshop_api.Application.Modules.ExceptionFilterErrors
{
    public static class NotFoundExceptionFilterError
    {
        public static void Add(ExceptionContext context, string key, string errorMessage)
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
