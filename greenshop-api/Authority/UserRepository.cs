using greenshop_api.Data;
using greenshop_api.Models;

namespace greenshop_api.Authority
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext db;
        public UserRepository(ApplicationDbContext db) 
        { 
            this.db = db;
        }
        public User CreateUser(User user)
        {
            db.Users.Add(user);
            db.SaveChanges();

            return user;
        }
        public User GetUserByEmail(string email)
        {
            return db.Users.FirstOrDefault(u => u.UserEmail == email);
        }

        public User GetUserById(long id)
        {
            return db.Users.Find(id);
        }
    }
}
