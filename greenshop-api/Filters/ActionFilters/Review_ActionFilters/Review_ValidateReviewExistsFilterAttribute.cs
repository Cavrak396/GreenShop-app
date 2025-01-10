using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateReviewExistsFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        private readonly IUserRepository repository;
        private readonly JwtService jwtService;

        public Review_ValidateReviewExistsFilterAttribute(ApplicationDbContext db, IUserRepository repository, JwtService jwtService)
        {
            this.db = db;
            this.repository = repository;
            this.jwtService = jwtService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();

            var plantId = context.ActionArguments["plantId"] as string;

            var review = await this.db.Reviews.FindAsync(userId, plantId);
            if (review == null)
            {
                ModelErrors.AddNotFoundActionModelError(context, "Review", "Review isn't added.");
                return;
            }

            await next();
        }
    }
}
