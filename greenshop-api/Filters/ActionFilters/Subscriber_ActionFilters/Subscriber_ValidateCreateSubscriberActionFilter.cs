using greenshop_api.Data;
using greenshop_api.Models;
using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateCreateSubscriberActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Subscriber_ValidateCreateSubscriberActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var subscriber = context.ActionArguments["subscriber"] as Subscriber;

            if (subscriber == null)
            {
                BadRequestActionFilterError.Add(context, "Subscriber", "Subscriber object is not valid.");
                return;
            }

            var existingSubscriber = await db.Subscribers.FirstOrDefaultAsync(s =>
            !string.IsNullOrWhiteSpace(subscriber.SubscriberEmail) &&
            !string.IsNullOrWhiteSpace(s.SubscriberEmail) &&
            subscriber.SubscriberEmail.ToLower() == s.SubscriberEmail.ToLower());

            if (existingSubscriber != null)
            {
                ConflictActionFilterError.Add(context, "Subscriber", "Subscriber is already added.");
                return;
            }

            await next();
        }
    }
}
