using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidateCartExistsActionFilter(
        ICartsRepository cartsRepository, 
        IActionErrorCreator actionErrorCreator, 
        IJwtService jwtService) : 
        IAsyncActionFilter
    {
        private readonly ICartsRepository _cartsRepository = 
            cartsRepository;
        private readonly IActionErrorCreator _actionErrorCreator = 
            actionErrorCreator;
        private readonly IJwtService _jwtService = 
            jwtService;

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var jwt = context.HttpContext.Request
                .Cookies["jwt"];
            var token = _jwtService
                .Verify(jwt!);
            var userId = token.Issuer
                .ToString();

            var cart = await _cartsRepository.GetCartByUserIdAsync(userId);

            if (cart == null)
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "Cart",
                    "Cart does not exist.",
                    404,
                    problemDetails => new NotFoundObjectResult(problemDetails));
            }

            await next();
        }
    }
}
