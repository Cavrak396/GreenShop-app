using greenshop_api.Data;
using greenshop_api.Models;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Authority
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext db;
        public UserRepository(ApplicationDbContext db) 
        { 
            this.db = db;
        }
        public async Task<User> CreateUserAsync(User user)
        {
            this.db.Users.Add(user);
            await this.db.SaveChangesAsync();

            return user;
        }
        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await this.db.Users.FirstOrDefaultAsync(u => u.UserEmail == email);
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await this.db.Users.FindAsync(id);
        }
    }
}
