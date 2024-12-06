using greenshop_api.Models;

namespace greenshop_api.Authority
{
    public interface IUserRepository
    {
        User CreateUser(User user);
        User GetUserByEmail(string email);
        User GetUserById(long id);
    }
}
