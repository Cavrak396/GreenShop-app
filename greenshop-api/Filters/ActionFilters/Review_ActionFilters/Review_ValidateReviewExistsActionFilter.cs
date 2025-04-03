using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Authority;
using greenshop_api.Infrastructure.Persistance;
using greenshop_api.Infrastructure.Services.Jwt;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Review_ActionFilters
{
    public class Review_ValidateReviewExistsActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        private readonly IUserRepository repository;
        private readonly JwtService jwtService;

        public Review_ValidateReviewExistsActionFilter(ApplicationDbContext db, IUserRepository repository, JwtService jwtService)
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
                NotFoundActionFilterError.Add(context, "Review", "Review isn't added.");
                return;
            }

            await next();
        }
    }
}
