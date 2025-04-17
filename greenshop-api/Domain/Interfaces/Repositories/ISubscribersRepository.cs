using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface ISubscribersRepository
    {
        Task<List<Subscriber>> GetAllSubscribersAsync();
        Task<Subscriber?> GetSubscriberByEmailAsync(string email);
        Task AddSubscriberAsync(Subscriber subscriber);
        Task DeleteSubscriberAsync(Subscriber subscriber);
        Task DeleteAllSubscribersAsync();
    }
}
