using greenshop_api.Application.Commands.CartItems;
using greenshop_api.Dtos.CartItems;
using greenshop_api.Filters.ActionFilters.Cart_ActionFilters;
using greenshop_api.Filters.ActionFilters.CartItems_ActionFilters;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CartItemsController(IMediator mediator) : 
        ControllerBase
    {
        private readonly IMediator _mediator = 
            mediator;

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("TokenBucketIpAddressLimiter")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidateCartExistsActionFilter))]
        [TypeFilter(typeof(CartItem_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> CreateCartItem([FromBody]CartItemDto cartItem)
        {
            await _mediator.Send(
            new AddCardItemCommand
            {
                CartItem = cartItem
            });

            return NoContent();
        }

        [HttpDelete("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("TokenBucketIpAddressLimiter")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(Cart_ValidateCartExistsActionFilter))]
        [TypeFilter(typeof(CartItem_ValidateCartItemExistsActionFIlter))]
        public async Task<IActionResult> DeleteCartItem([FromRoute]string plantId)
        {
            await _mediator.Send(
            new DeleteCartItemCommand
            {
                PlantId = plantId
            });

            return NoContent();
        }
    }
}
