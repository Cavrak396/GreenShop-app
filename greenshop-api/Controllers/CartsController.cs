using greenshop_api.Application.Commands.Carts;
using greenshop_api.Application.Models;
using greenshop_api.Application.Queries.Users;
using greenshop_api.Domain.Interfaces.Service;
using greenshop_api.Dtos.CartItems;
using greenshop_api.Filters.ActionFilters.Cart_ActionFilters;
using greenshop_api.Filters.ActionFilters.General;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Filters.ExceptionFilters.Carts;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CartsController(
        INewsletterService newsletterService,
        IMediator mediator) : 
        ControllerBase
    {
        private readonly INewsletterService _newsletterService = 
            newsletterService;
        private readonly IMediator _mediator = 
            mediator;

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("TokenBucketIpAddressLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidatePlantIdsActionFilter))]
        [TypeFilter(typeof(Cart_HandleUpdateCartExceptionFilter))]
        public async Task<IActionResult> SyncCart([FromBody]List<CartItemDto> cartItems)
        {
            var cartDto = await _mediator.Send(
            new AddCartCommand
            {
                CartItems = cartItems
            });

            return Ok(cartDto);
        }

        [HttpPut]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("TokenBucketIpAddressLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidateCartExistsActionFilter))]
        [TypeFilter(typeof(Cart_HandleUpdateCartExceptionFilter))]

        public async Task<IActionResult> PurchaseCart()
        {
            var cartDto = await _mediator.Send(
                new RemoveCartItemsCommand());
            var getUserDto = await _mediator.Send(
                new GetUserQuery());

            await _newsletterService.SendNewsletterAsync(
                "purchase",
                new NewsletterHeader
                {
                    Recipient = getUserDto.UserEmail,
                    Details = getUserDto.UserName
                }
            );

            return Ok(cartDto);
        }
    }
}
