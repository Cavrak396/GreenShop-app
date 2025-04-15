using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;

namespace greenshop_api.Infrastructure.Repositories
{
    public class CartItemsRepository(ApplicationDbContext dbContext) : ICartItemsRepository
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        public async Task DeleteCartItemsAsync(List<CartItem> cartItems)
        {
            _dbContext.CartItems.RemoveRange(cartItems);
            await _dbContext.SaveChangesAsync();
        }
    }
}
