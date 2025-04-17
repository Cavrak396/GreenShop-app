using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Infrastructure.Repositories
{
    public class SubscribersRepository(ApplicationDbContext dbContext) : ISubscribersRepository
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        public async Task<List<Subscriber>> GetAllSubscribersAsync()
        {
            return await _dbContext.Subscribers.ToListAsync();
        }

        public async Task<Subscriber?> GetSubscriberByEmailAsync(string email)
        {
            return await _dbContext.Subscribers
                .FirstOrDefaultAsync(s => s.SubscriberEmail == email);
        }

        public async Task AddSubscriberAsync(Subscriber subscriber)
        {
            _dbContext.Subscribers.Add(subscriber);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task DeleteSubscriberAsync(Subscriber subscriber)
        {
            _dbContext.Subscribers.Remove(subscriber);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAllSubscribersAsync()
        {
            var allSubscribers = _dbContext.Subscribers.ToList();

            _dbContext.Subscribers.RemoveRange(allSubscribers);
            await _dbContext.SaveChangesAsync();
        }
    }
}
