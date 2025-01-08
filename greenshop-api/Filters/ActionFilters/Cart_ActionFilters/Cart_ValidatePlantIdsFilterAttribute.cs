using greenshop_api.Data;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidatePlantIdsFilterAttribute : IAsyncActionFilter
    {
        private readonly ApplicationDbContext db;

        public Cart_ValidatePlantIdsFilterAttribute(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cartItems = context.ActionArguments["cartItems"] as List<CartItemDto>;

            foreach(var cartItem in cartItems)
            {
                var plant = await this.db.Plants.FindAsync(cartItem.PlantId);
                if(plant == null)
                {
                    ModelErrors.AddNotFoundActionModelError(context, "CartItem", "One or more plants in cart doesn't exist.");
                    return;
                }
            }

            await next();
        }
    }
}
