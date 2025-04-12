using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Plant_ExceptionFilters
{
    public class Plant_HandleUpdateExceptionFilter(
        ApplicationDbContext dbContext,
        IExceptionCreator exceptionCreator) : IAsyncExceptionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IExceptionCreator _exceptionCreator = exceptionCreator;

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var plantId = context.RouteData.Values["plantId"] as string;

            if (await _dbContext.Plants.FindAsync(plantId) == null)
            {
                _exceptionCreator.CreateException(
                     context,
                     "Plant",
                     "Plant does not exist anymore.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
            }
        }
    }
}
