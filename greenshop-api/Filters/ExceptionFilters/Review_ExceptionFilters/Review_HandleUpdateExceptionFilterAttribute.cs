using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Review_ExceptionFilters
{
    public class Review_HandleUpdateExceptionFilterAttribute : IAsyncExceptionFilter
    {
        private readonly ApplicationDbContext db;
        private readonly JwtService jwtService;

        public Review_HandleUpdateExceptionFilterAttribute(ApplicationDbContext db, JwtService jwtService)
        {
            this.db = db;
            this.jwtService = jwtService;
        }

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();

            var plantId = context.RouteData.Values["plantId"] as string;

            if (await db.Reviews.FindAsync(userId, plantId) == null)
            {
                ModelErrors.AddNotFoundExceptionModelError(context, "Review", "Review doesn't exist anymore.");
            }
        }
    }
}
