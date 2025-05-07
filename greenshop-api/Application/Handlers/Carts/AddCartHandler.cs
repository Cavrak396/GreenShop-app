using AutoMapper;
using greenshop_api.Application.Commands.Carts;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Carts;
using MediatR;

namespace greenshop_api.Application.Handlers.Carts
{
    public class AddCartHandler(
        ICartsRepository cartsRepository,
        ICartItemsRepository cartItemsRepository,
        IPlantsRepository plantsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : IRequestHandler<AddCartCommand, CartDto>
    {
        private readonly ICartsRepository _cartsRepository = cartsRepository;
        private readonly ICartItemsRepository _cartItemsRepository = cartItemsRepository;
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IMapper _mapper = mapper;

        public async Task<CartDto> Handle(AddCartCommand request, CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var cart = await _cartsRepository.GetCartByUserIdAsync(userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    CartId = Guid.NewGuid().ToString(),
                    UserId = userId,
                    CartPrice = 0,
                    CartItems = []
                };
                await _cartsRepository.AddCartAsync(cart);
            }

            bool cartsMatch = cart.CartItems!.Count != 0 &&
                              request.CartItems!.Count == cart.CartItems!.Count &&
                              request.CartItems!
                                .All(ci => cart.CartItems
                                .Any(c => c.PlantId == ci.PlantId 
                                && c.Quantity == ci.Quantity));

            if (cartsMatch)
            {
                return _mapper.Map<CartDto>(cart);
            }
            var test = cart.CartId;

            var cartItemsToAdd = _mapper.Map<List<CartItem>>(
                request.CartItems, 
                opt => opt.Items["CartId"] = cart.CartId
            );

            var plantIds = request.CartItems!.Select(ci => ci.PlantId).ToList();

            var plants = await _plantsRepository.GetPlantsByIdsAsync(plantIds!);

            double cartPrice = cart.CartPrice;

            foreach (var cartItem in cartItemsToAdd)
            {
                var plantPrice = (double)(plants!
                    .GetValueOrDefault(cartItem.PlantId)!.Price)!;
 
                var existingCartItem = await _cartItemsRepository.GetCartItemByIdsAsync(cart.CartId!, cartItem.PlantId!);

                if (existingCartItem != null)
                {
                    cartPrice -= plantPrice * existingCartItem.Quantity;
                    await _cartItemsRepository.UpdateCartItemQuantity(existingCartItem, cartItem.Quantity);
                }
                else
                {
                    await _cartItemsRepository.AddCartItem(cartItem);
                }
                cartPrice += plantPrice * cartItem.Quantity;
            }

            var result = await _cartsRepository
                .UpdateCartPriceAsync(cart, cartPrice);

            return _mapper.Map<CartDto>(result);
        }
    }
}
