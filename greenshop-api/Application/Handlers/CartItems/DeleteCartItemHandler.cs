using greenshop_api.Application.Commands.CartItems;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.CartItems
{
    public class DeleteCartItemHandler(
        ICartsRepository cartsRepository,
        ICartItemsRepository cartItemsRepository,
        IPlantsRepository plantsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor) : IRequestHandler<DeleteCartItemCommand, Unit>
    {
        private readonly ICartsRepository _cartsRepository = cartsRepository;
        private readonly ICartItemsRepository _cartItemsRepository = cartItemsRepository;
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        public async Task<Unit> Handle(DeleteCartItemCommand request, CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var cart = await _cartsRepository.GetCartByUserIdAsync(userId);

            var plant = await _plantsRepository.GetPlantByIdAsync(request.PlantId!);

            var cartItemToDelete = await _cartItemsRepository.GetCartItemByIdsAsync(cart!.CartId!, plant!.PlantId!);

            //cart.CartItems!.Remove(cartItemToDelete!);
            await _cartItemsRepository.DeleteCartItemAsync(cartItemToDelete!);
            await _cartsRepository.UpdateCartPriceAsync(cart, cart.CartPrice - (double)plant.Price! * cartItemToDelete!.Quantity);

            return Unit.Value;
        }
    }
}
