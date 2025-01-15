using greenshop_api.Models;

namespace greenshop_api.Authority
{
    public interface IUserRepository
    {
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(string userId);
        Task<List<User>> GetUsersByIdsAsync(List<string> userIds);
    }
}
