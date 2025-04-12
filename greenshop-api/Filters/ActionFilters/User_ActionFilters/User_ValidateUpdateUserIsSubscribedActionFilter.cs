using greenshop_api.Domain.Interfaces.Creators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateUpdateUserIsSubscribedActionFilter(IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var isSubscribed = context.ActionArguments["isSubscribed"];

            if(isSubscribed == null)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "IsSubscribed",
                     "Invalid IsSubscribed.",
                     400,
                     problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
