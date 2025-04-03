using greenshop_api.Application.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateUpdateUserIsSubscribedActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var isSubscribed = context.ActionArguments["isSubscribed"];

            if(isSubscribed == null)
            {
                BadRequestActionFilterError.Add(context, "IsSubscribed", "IsSubscribed is missing.");
                return;
            }

            await next();
        }
    }
}
