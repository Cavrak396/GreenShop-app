using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters
{
    public class Subscriber_ValidateDeleteSubscribersActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allSubscribers = await _dbContext.Subscribers.ToListAsync();

            if (allSubscribers.Count == 0)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "Subscriber",
                     "No Subscribers found to delete.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
