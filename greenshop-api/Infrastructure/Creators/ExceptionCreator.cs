using greenshop_api.Domain.Interfaces.Creators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Infrastructure.Creators
{
    public class ExceptionCreator : IExceptionCreator
    {
        public void CreateException<TResult>(
            ExceptionContext context, 
            string key, 
            string message, 
            int statusCode, 
            Func<ValidationProblemDetails, TResult> resultFactory) 
            where TResult : ObjectResult
        {
            context.ModelState.AddModelError(key, message);
            var problemDetails = new ValidationProblemDetails(context.ModelState)
            {
                Status = statusCode
            };
            context.Result = resultFactory(problemDetails);
        }
    }
}
