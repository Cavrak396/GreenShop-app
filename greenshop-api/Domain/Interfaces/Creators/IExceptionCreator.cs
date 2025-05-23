using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace greenshop_api.Domain.Interfaces.Creators
{
    public interface IExceptionCreator
    {
        void CreateException<TResult>(
            ExceptionContext context,
            string key,
            string message,
            int statusCode,
            Func<ValidationProblemDetails, TResult> resultFactory)
            where TResult : 
            ObjectResult;
    }
}
