using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateSubscriberIdFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;

        public Subscriber_ValidateSubscriberIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var subscriberId = context.ActionArguments["subscriberId"] as string;
            if (string.IsNullOrEmpty(subscriberId))
            {
                ModelErrors.AddBadRequestActionModelError(context, "SubscriberId", "Subscriber Id must be provided.");
            }
            else
            {
                var subscriber = db.Subscribers.Find(subscriberId);
                if (subscriber == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "SubscriberId", "Subscriber isn't added.");
                }
            }
        }
    }
}
