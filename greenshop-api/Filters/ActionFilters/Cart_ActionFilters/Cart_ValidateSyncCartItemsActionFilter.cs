using greenshop_api.Dtos;
using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidateSyncCartItemsActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cartItems = context.ActionArguments["cartItems"] as List<CartItemDto>;

            if (cartItems == null)
            {
                BadRequestActionFilterError.Add(context, "CartItem", "CartItems are not valid.");
                return;
            }

            await next();
        }
    }
}
