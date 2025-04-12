using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateSubscriberIdActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var subscriberId = context.ActionArguments["subscriberId"] as string;

            if (string.IsNullOrEmpty(subscriberId))
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "SubscriberId",
                     "Invalid SubscriberId.",
                     400,
                     problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }

            var subscriber = await _dbContext.Subscribers.FindAsync(subscriberId);
            if (subscriber == null)
            {
                _actionErrorCreator.CreateActionError(
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
