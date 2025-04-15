using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface IUsersRepository
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(string id);
        Task<User?> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task UpdateUserIsSubscribedAsync(User user, bool isSubscribed);
        Task DeleteUserAsync(User user);
    }
}
