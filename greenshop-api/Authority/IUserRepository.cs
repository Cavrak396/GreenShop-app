using greenshop_api.Models;

namespace greenshop_api.Authority
{
    public interface IUserRepository
    {
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(long id);
    }
}
