using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateCreateSubscriberFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public Subscriber_ValidateCreateSubscriberFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var subscriber = context.ActionArguments["subscriber"] as Subscriber;
            if (subscriber == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Subscriber", "Subscriber object cannot be null.");
            }
            else
            {
                var existingSubscriber = db.Subscribers.FirstOrDefault(s =>
                !string.IsNullOrWhiteSpace(subscriber.SubscriberEmail) &&
                !string.IsNullOrWhiteSpace(s.SubscriberEmail) &&
                subscriber.SubscriberEmail.ToLower() == s.SubscriberEmail.ToLower());

                if (existingSubscriber != null)
                {
                    ModelErrors.AddBadRequestActionModelError(context, "Subscriber", "Subscriber is already added.");
                }
            }
        }
    }
}
