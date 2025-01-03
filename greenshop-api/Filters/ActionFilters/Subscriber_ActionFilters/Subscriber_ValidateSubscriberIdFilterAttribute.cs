using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateSubscriberIdFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Subscriber_ValidateSubscriberIdFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var subscriberId = context.ActionArguments["subscriberId"] as string;

            if (string.IsNullOrEmpty(subscriberId))
            {
                ModelErrors.AddBadRequestActionModelError(context, "SubscriberId", "Subscriber Id must be provided.");
            }
            else
            {
                var subscriber = await db.Subscribers.FindAsync(subscriberId);
                if (subscriber == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "SubscriberId", "Subscriber isn't added.");
                }
            }

            await next();
        }
    }
}
