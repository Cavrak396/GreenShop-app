using Microsoft.EntityFrameworkCore;
using greenshop_api.Domain.Models;

namespace greenshop_api.Infrastructure.Persistance
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Plant>? Plants { get; set; }
        public DbSet<Subscriber>? Subscribers { get; set; }
        public DbSet<User>? Users { get; set; }
        public DbSet<Review>? Reviews { get; set; }
        public DbSet<Cart>? Carts { get; set; }
        public DbSet<CartItem>? CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Subscriber>(entity => { 
                entity
                .HasIndex(e => e.SubscriberEmail)
                .IsUnique(); 
            });
            modelBuilder.Entity<User>(entity => { 
                entity
                .HasIndex(e => e.UserEmail)
                .IsUnique(); 
            });

            modelBuilder.Entity<Review>()
                .HasKey(r => new { r.UserId, r.PlantId });

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Plant)
                .WithMany(p => p.Reviews)
                .HasForeignKey(r => r.PlantId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cart>()
                .HasIndex(c => c.UserId)
                .IsUnique();

            modelBuilder.Entity<Cart>()
                .HasOne(c => c.User)
                .WithMany(u => u.Carts)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasKey(ci => new { ci.CartId, ci.PlantId });

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Plant)
                .WithMany()
                .HasForeignKey(ci => ci.PlantId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CartItem>()
                .HasIndex(ci => new { ci.CartId, ci.PlantId })
                .IsUnique();
        }
    }
}

