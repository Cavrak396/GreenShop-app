using greenshop_api.Data;
using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateSubscriberIdActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Subscriber_ValidateSubscriberIdActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var subscriberId = context.ActionArguments["subscriberId"] as string;

            if (string.IsNullOrEmpty(subscriberId))
            {
                BadRequestActionFilterError.Add(context, "SubscriberId", "SubscriberId is not valid.");
                return;
            }

            var subscriber = await db.Subscribers.FindAsync(subscriberId);
            if (subscriber == null)
            {
                NotFoundActionFilterError.Add(context, "Subscriber", "Subscriber isn't added.");
                return;
            }

            await next();
        }
    }
}
