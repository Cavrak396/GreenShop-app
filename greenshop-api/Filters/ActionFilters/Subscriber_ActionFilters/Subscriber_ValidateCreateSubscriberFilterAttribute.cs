using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateCreateSubscriberFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Subscriber_ValidateCreateSubscriberFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var subscriber = context.ActionArguments["subscriber"] as Subscriber;

            if (subscriber == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Subscriber", "Subscriber object cannot be null.");
                return;
            }
            else
            {
                var existingSubscriber = await db.Subscribers.FirstOrDefaultAsync(s =>
                !string.IsNullOrWhiteSpace(subscriber.SubscriberEmail) &&
                !string.IsNullOrWhiteSpace(s.SubscriberEmail) &&
                subscriber.SubscriberEmail.ToLower() == s.SubscriberEmail.ToLower());

                if (existingSubscriber != null)
                {
                    ModelErrors.AddConflictActionModelError(context, "Subscriber", "Subscriber is already added.");
                    return;
                }
            }

            await next();
        }
    }
}
