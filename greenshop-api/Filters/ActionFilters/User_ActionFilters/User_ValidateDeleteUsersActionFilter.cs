using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.User_ActionFilters
{
    public class User_ValidateDeleteUsersActionFilter(
        ApplicationDbContext dbContext, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allUsers = await _dbContext.Users.ToListAsync();

            if (allUsers.Count() == 0)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "User",
                     "No Users found to delete.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
