using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateCreateSubscriberActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var subscriber = context.ActionArguments["subscriber"] as Subscriber;

            var existingSubscriber = await _dbContext.Subscribers.FirstOrDefaultAsync(s =>
            !string.IsNullOrWhiteSpace(subscriber!.SubscriberEmail) &&
            !string.IsNullOrWhiteSpace(s.SubscriberEmail) &&
            subscriber.SubscriberEmail.ToLower() == s.SubscriberEmail.ToLower());

            if (existingSubscriber != null)
            {
                _actionErrorCreator.CreateActionError(
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
