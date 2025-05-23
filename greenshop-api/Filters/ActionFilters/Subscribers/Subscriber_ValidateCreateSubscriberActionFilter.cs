using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Subscribers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateCreateSubscriberActionFilter(
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
            var subscriber = context
                .ActionArguments["subscriber"] as SubscriberDto;

            var existingSubscriber = await _subscribersRepository
                .GetSubscriberByEmailAsync(subscriber!.SubscriberEmail!);

            if (existingSubscriber != null)
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "Subscriber",
                    "Subscriber is already added.",
                    409,
                    problemDetails => new ConflictObjectResult(problemDetails));
                
                return;
            }

            await next();
        }
    }
}
