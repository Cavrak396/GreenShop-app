using greenshop_api.Application.Commands.Carts;
using greenshop_api.Dtos.CartItems;
using greenshop_api.Filters.ActionFilters.Cart_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CartsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidatePlantIdsActionFilter))]
        public async Task<IActionResult> SyncCart([FromBody]List<CartItemDto> cartItems)
        {
            var cartDto = await _mediator.Send(new AddCartCommand
            {
                CartItems = cartItems
            });

            return Ok(cartDto);
        }

        [HttpPut]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidateRemoveCartItemsActionFilter))]

        public async Task<IActionResult> RemoveCartItems()
        {
            var cartDto = await _mediator.Send(new DeleteCartItemsCommand());
            return Ok(cartDto);
        }
    }
}
