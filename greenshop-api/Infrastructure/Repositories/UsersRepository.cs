using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Infrastructure.Repositories
{
    public class UsersRepository(ApplicationDbContext dbContext) : 
        IUsersRepository
    {
        private readonly ApplicationDbContext _dbContext = 
            dbContext;

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _dbContext.Users!
                .ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _dbContext.Users!
                .FindAsync(id);
        }

        public async Task<List<User>> GetUsersByIdsAsync(List<string> ids)
        {
            return await _dbContext.Users!
                .Where(u => ids
                .Contains(u.UserId!))
                .ToListAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dbContext.Users!
                .FirstOrDefaultAsync(u => u.UserEmail == email);
        }

        public async Task AddUserAsync(User user)
        {
            _dbContext.Users!
                .Add(user);
            await _dbContext
                .SaveChangesAsync();
        }

        public async Task UpdateUserIsSubscribedAsync(
            User user, 
            bool isSubscribed)
        {
            user.IsSubscribed = isSubscribed;
            await _dbContext
                .SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user)
        {
            _dbContext.Users!
                .Remove(user);
            await _dbContext
                .SaveChangesAsync();
        }
    }
}
