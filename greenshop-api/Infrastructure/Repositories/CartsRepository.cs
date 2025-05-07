using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Infrastructure.Repositories
{
    public class CartsRepository(ApplicationDbContext dbContext) : ICartsRepository
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        public async Task<Cart?> GetCartByUserIdAsync(string id)
        {
            return await _dbContext.Carts!
                .Include(c => c.CartItems!)
                .ThenInclude(ci => ci.Plant)
                .FirstOrDefaultAsync(c => c.UserId == id);
        }
        public async Task<Cart> AddCartAsync(Cart cart)
        {
            var result = _dbContext.Carts!.Add(cart);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Cart> UpdateCartPriceAsync(Cart cart, double price)
        {
            cart.CartPrice = price;
            await _dbContext.SaveChangesAsync();
            return cart;
        }
    }
}
