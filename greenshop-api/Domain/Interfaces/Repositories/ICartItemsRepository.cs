using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface ICartItemsRepository
    {
        Task DeleteCartItemsAsync(List<CartItem> cartItems);
    }
}
