using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface ICartsRepository
    {
        Task<Cart?> GetCartByUserIdAsync(string id);
        Task<Cart> AddCartAsync(Cart cart);
        Task<Cart> UpdateCartPriceAsync(Cart cart, double price);
    }
}
