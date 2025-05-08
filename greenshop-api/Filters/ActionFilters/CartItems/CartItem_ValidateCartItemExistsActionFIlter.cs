using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.CartItems_ActionFilters
{
    public class CartItem_ValidateCartItemExistsActionFIlter(
        ICartsRepository cartsRepository,
        ICartItemsRepository cartItemsRepository,
        IJwtService jwtService,
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly ICartsRepository _cartsRepository = cartsRepository;
        private readonly ICartItemsRepository _cartItemsRepository = cartItemsRepository;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var plantId = context.ActionArguments["plantId"] as string;

            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var cart = await _cartsRepository.GetCartByUserIdAsync(userId);
            var cartItem = await _cartItemsRepository.GetCartItemByIdsAsync(cart!.CartId!, plantId!);

            if(cartItem == null)
            {
                _actionErrorCreator.CreateActionError(
                  context,
                  "CartItem",
                  "Cart Item is not added.",
                  404,
                  problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }

            await next();
        }
    }
}
