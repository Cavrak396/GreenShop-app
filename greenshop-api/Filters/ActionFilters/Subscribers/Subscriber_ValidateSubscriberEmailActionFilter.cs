using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateSubscriberEmailActionFilter(
        ISubscribersRepository subscribersRepository, 
        IActionErrorCreator actionErrorCreator) : 
        IAsyncActionFilter
    {
        private readonly ISubscribersRepository _subscribersRepository = 
            subscribersRepository;
        private readonly IActionErrorCreator _actionErrorCreator = 
            actionErrorCreator;

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var subscriberEmail = context
                .ActionArguments["subscriberEmail"] as string;

            var subscriber = await _subscribersRepository
                .GetSubscriberByEmailAsync(subscriberEmail!);
            if (subscriber == null)
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "Subscriber",
                    "Subscriber is not added.",
                    404,
                    problemDetails => new NotFoundObjectResult(problemDetails));
                
                return;
            }

            await next();
        }
    }
}
