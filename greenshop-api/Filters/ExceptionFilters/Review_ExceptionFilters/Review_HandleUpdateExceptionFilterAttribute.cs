using greenshop_api.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Review_ExceptionFilters
{
    public class Review_HandleUpdateExceptionFilterAttribute : IAsyncExceptionFilter
    {
        private readonly ApplicationDbContext db;

        public Review_HandleUpdateExceptionFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var plantId = context.RouteData.Values["id"] as string;
            var userId = context.RouteData.Values["userId"] as string;

            if (await db.Reviews.FindAsync(userId, plantId) == null)
            {
                ModelErrors.AddNotFoundExceptionModelError(context, "Review", "Review doesn't exist anymore.");
            }
        }
    }
}
