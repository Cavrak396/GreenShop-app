using AutoMapper;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.CartItems;
using greenshop_api.Dtos.Carts;
using greenshop_api.Filters.ActionFilters.Cart_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;

        public CartsController(ApplicationDbContext db, IMapper mapper, IJwtService jwtService)
        {
            this.db = db;
            this.mapper = mapper;
            this.jwtService = jwtService;
        }

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidatePlantIdsActionFilter))]
        public async Task<IActionResult> SyncCart([FromBody]List<CartItemDto> cartItems)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            CartDto cartDto;

            var cart = await this.db.Carts!
               .Include(c => c.CartItems!)
               .ThenInclude(ci => ci.Plant)
               .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    CartId = Guid.NewGuid().ToString(),
                    UserId = userId,
                    CartPrice = 0,
                    CartItems = []
                };
                this.db.Carts.Add(cart);
            }

            bool cartsMatch = cartItems.Any() && cart.CartItems!.Any() &&
                              cartItems.Count == cart.CartItems!.Count &&
                              cartItems.All(ci => cart.CartItems.Any(c => c.PlantId == ci.PlantId && c.Quantity == ci.Quantity));

            if (cartsMatch)
            {
                cartDto = mapper.Map<CartDto>(cart);
                
                return Ok(cartDto);
            }
            var test = cart.CartId;

            var cartItemsToAdd = mapper.Map<List<CartItem>>(cartItems, opt => opt.Items["CartId"] = cart.CartId);

            var plantIds = cartItems.Select(ci => ci.PlantId).ToList();
            var plants = await this.db.Plants
                .Where(p => plantIds.Contains(p.PlantId))
                .ToDictionaryAsync(p => p.PlantId!);

            double cartPrice = cart.CartPrice;

            foreach (var cartItem in cartItemsToAdd)
            {
                var existingItem = cart.CartItems!.FirstOrDefault(ci => ci.PlantId == cartItem.PlantId);
                if (existingItem != null)
                {
                    existingItem.Quantity += cartItem.Quantity;
                }

                else
                {
                    cart.CartItems!.Add(cartItem);
                }
                var plant = plants!.GetValueOrDefault(cartItem.PlantId);
                cartPrice += (double)plant!.Price! * cartItem.Quantity;
            }
            cart.CartPrice = cartPrice;

            await this.db.SaveChangesAsync();

            cartDto = mapper.Map<CartDto>(cart);

            return Ok(cartDto);
        }

        [HttpPut]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Cart_ValidateRemoveCartItemsActionFilter))]

        public async Task<IActionResult> RemoveCartItems()
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var cart = await this.db.Carts
                .Include(c => c.CartItems!)
                .ThenInclude(ci => ci.Plant)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            this.db.CartItems.RemoveRange(cart!.CartItems!);
            cart.CartItems!.Clear();
            cart.CartPrice = 0;
            await this.db.SaveChangesAsync();

            var cartDto = mapper.Map<CartDto>(cart);

            return Ok(cartDto);
        }
    }
}
