using AutoMapper;
using greenshop_api.Application.Commands.CartItems;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using MediatR;

namespace greenshop_api.Application.Handlers.CartItems
{
    public class AddCartItemHandler(
        ICartsRepository cartsRepository,
        ICartItemsRepository cartItemsRepository,
        IPlantsRepository plantsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : IRequestHandler<AddCardItemCommand, Unit>
    {
        private readonly ICartsRepository _cartsRepository = cartsRepository;
        private readonly ICartItemsRepository _cartItemsRepository = cartItemsRepository;
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IMapper _mapper = mapper;
        public async Task<Unit> Handle(AddCardItemCommand request, CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var cart = await _cartsRepository.GetCartByUserIdAsync(userId);

            var plant = await _plantsRepository.GetPlantByIdAsync(request.CartItem!.PlantId!);

            var cartItemToAdd = _mapper.Map<CartItem>(
                request.CartItem,
                opt => opt.Items["CartId"] = cart!.CartId
            );

            var existingCartItem = await _cartItemsRepository.GetCartItemByIdsAsync(cart!.CartId!, plant!.PlantId!);

            double cartPrice = cart.CartPrice;

            if (existingCartItem != null)
            {
                cartPrice -= (double)plant!.Price! * existingCartItem.Quantity;
                await _cartItemsRepository.UpdateCartItemQuantity(existingCartItem, cartItemToAdd.Quantity);
            }
            else
            {
                cart.CartItems!.Add(cartItemToAdd);
                await _cartItemsRepository.AddCartItem(cartItemToAdd);
            }
            cartPrice += (double)plant!.Price! * cartItemToAdd.Quantity;
            var result = await _cartsRepository
                .UpdateCartPriceAsync(cart, cartPrice);

            return Unit.Value;

        }
    }
}
