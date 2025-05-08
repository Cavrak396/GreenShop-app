using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Carts
{
    public class Cart_HandleUpdateCartExceptionFilter(
        ICartsRepository cartsRepository,
        IJwtService jwtService,
        IExceptionCreator exceptionCreator) : IAsyncExceptionFilter
    {
        private readonly ICartsRepository _cartsRepository = cartsRepository;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IExceptionCreator _exceptionCreator = exceptionCreator;
        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var jwt = context.HttpContext.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();
            
            if(await _cartsRepository.GetCartByUserIdAsync(userId) == null)
            {
                _exceptionCreator.CreateException(
                     context,
                     "Cart",
                     "Cart does not exist anymore.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
            }

        }
    }
}
