using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidateSyncCartItemsFilterAttribute : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cartItems = context.ActionArguments["cartItems"] as List<CartItemDto>;

            if (cartItems == null)
            {
                ModelErrors.AddBadRequestActionModelError(context, "Cart", "List of cart items cannot be null.");
                return;
            }

            await next();
        }
    }
}
