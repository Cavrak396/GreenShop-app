using greenshop_api.Application.Modules.ActionFilterErrors;
using greenshop_api.Authority;
using greenshop_api.Infrastructure.Persistance;
using greenshop_api.Infrastructure.Services.Jwt;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidateRemoveCartItemsActionFilter : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;
        private readonly JwtService jwtService;

        public Cart_ValidateRemoveCartItemsActionFilter(ApplicationDbContext db, JwtService jwtService)
        {
            this.db = db;
            this.jwtService = jwtService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();

            var cart = await this.db.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Plant)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                NotFoundActionFilterError.Add(context, "Cart", "Cart doesn't exist.");
            }

            await next();
        }
    }
}
