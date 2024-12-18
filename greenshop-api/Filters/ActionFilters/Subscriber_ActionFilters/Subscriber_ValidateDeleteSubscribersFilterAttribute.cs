using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateDeleteSubscribersFilterAttribute : ActionFilterAttribute
    {
        private readonly ApplicationDbContext db;
        public Subscriber_ValidateDeleteSubscribersFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var allSubscribers = this.db.Subscribers.ToList();

            if (allSubscribers.Count() == 0)
            {
                ModelErrors.AddNotFoundActionModelError(context, "Subscriber", "No subscribers found to delete.");
            }
        }
    }
}
