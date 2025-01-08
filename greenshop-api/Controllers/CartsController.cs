using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.Cart_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public CartsController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpPost("{userId}")]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        [TypeFilter(typeof(Cart_ValidateCartItemsFilterAttribute))]
        [TypeFilter(typeof(Cart_ValidatePlantIdsFilterAttribute))]
        public async Task<IActionResult> SyncCart(string userId, [FromBody]List<CartItemDto> cartItems)
        {
            var cart = await this.db.Carts
               .Include(c => c.CartItems)
               .ThenInclude(ci => ci.Plant)
               .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart {
                    CartId = Guid.NewGuid().ToString(),
                    UserId = userId, 
                    CartItems = new List<CartItem>() 
                };
                this.db.Carts.Add(cart);
            }

            bool cartsMatch = cartItems.Count == cart.CartItems.Count &&
                      cartItems.All(ci =>
                          cart.CartItems.Any(c => c.PlantId == ci.PlantId && c.Quantity == ci.Quantity));

            if (cartsMatch)
            {
                return Ok(cart);
            }

            var plantIds = cartItems.Select(ci => ci.PlantId).ToList();
            var plants = await this.db.Plants
                .Where(p => plantIds.Contains(p.PlantId))
                .ToDictionaryAsync(p => p.PlantId);

            double cartPrice = 0;

            foreach (var cartItem in cartItems)
            {
                var existingItem = cart.CartItems.FirstOrDefault(ci => ci.PlantId == cartItem.PlantId);
                if (existingItem != null)
                {
                    existingItem.Quantity += cartItem.Quantity;
                }

                else
                {
                    cart.CartItems.Add(new CartItem
                    {
                        CartId = cart.CartId,
                        PlantId = cartItem.PlantId,
                        Quantity = cartItem.Quantity
                    });
                }
                var plant = plants.GetValueOrDefault(cartItem.PlantId);
                cartPrice += (double)plant.Price * cartItem.Quantity;
            }
            cart.CartPrice = cartPrice;

            await this.db.SaveChangesAsync();
            return Ok(cart);
        }
    }
}
