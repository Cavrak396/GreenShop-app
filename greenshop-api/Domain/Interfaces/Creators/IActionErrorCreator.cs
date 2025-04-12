using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace greenshop_api.Domain.Interfaces.Creators
{
    public interface IActionErrorCreator
    {
        void CreateActionError<TResult>(
            ActionExecutingContext context,
            string key,
            string message,
            int statusCode,
            Func<ValidationProblemDetails, TResult> resultFactory)
            where TResult : ObjectResult;
    }
}
