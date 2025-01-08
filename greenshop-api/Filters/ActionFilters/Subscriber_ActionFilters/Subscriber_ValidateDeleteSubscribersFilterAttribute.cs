using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateDeleteSubscribersFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        public Subscriber_ValidateDeleteSubscribersFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allSubscribers = await this.db.Subscribers.ToListAsync();

            if (allSubscribers.Count() == 0)
            {
                ModelErrors.AddNotFoundActionModelError(context, "Subscriber", "No subscribers found to delete.");
                return;
            }

            await next();
        }
    }
}
