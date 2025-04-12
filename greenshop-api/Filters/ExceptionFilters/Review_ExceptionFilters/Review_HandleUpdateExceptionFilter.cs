using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Review_ExceptionFilters
{
    public class Review_HandleUpdateExceptionFilter(
        ApplicationDbContext dbContext, 
        IExceptionCreator exceptionCreator, 
        IJwtService jwtService) : IAsyncExceptionFilter
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IExceptionCreator _exceptionCreator = exceptionCreator;
        private readonly IJwtService _jwtService = jwtService;

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var plantId = context.RouteData.Values["plantId"] as string;

            if (await _dbContext.Reviews.FindAsync(userId, plantId) == null)
            {
                _exceptionCreator.CreateException(
                     context,
                     "Review",
                     "Review does not exist anymore.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
            }
        }
    }
}
