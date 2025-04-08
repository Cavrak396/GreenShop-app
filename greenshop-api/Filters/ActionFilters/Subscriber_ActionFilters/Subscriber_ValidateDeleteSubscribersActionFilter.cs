using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateDeleteSubscribersActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        public Subscriber_ValidateDeleteSubscribersActionFilter(ApplicationDbContext db)
        {
            this.db = db;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allSubscribers = await this.db.Subscribers.ToListAsync();

            if (allSubscribers.Count() == 0)
            {
                NotFoundActionFilterError.Add(context, "Subscriber", "No subscribers found to delete.");
                return;
            }

            await next();
        }
    }
}
