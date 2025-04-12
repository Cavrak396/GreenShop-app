using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidateSyncCartItemsActionFilter(IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cartItems = context.ActionArguments["cartItems"] as List<CartItemDto>;

            if (cartItems == null)
            {
                _actionErrorCreator.CreateActionError(
                     context,
                     "CartItem",
                     "Invalid CartItems.",
                     400,
                     problemDetails => new BadRequestObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
