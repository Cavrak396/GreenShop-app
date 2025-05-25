using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface ICartItemsRepository
    {
        Task<CartItem?> GetCartItemByIdsAsync(
            string cartId, 
            string plantId);
        Task AddCartItem(CartItem cartItem);
        Task UpdateCartItemQuantity(
            CartItem cartItem, 
            int quantity);
        Task DeleteCartItemAsync(CartItem cartItem);
        Task DeleteCartItemsAsync(List<CartItem> cartItems);
    }
}
