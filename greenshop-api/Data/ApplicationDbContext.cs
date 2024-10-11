using System;
using Microsoft.EntityFrameworkCore;
using greenshop_api.Models;

namespace greenshop_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.Entity<Plant>().HasData(
        //        new Plant
        //        {
        //            PlantId = 11102401,
        //            Name = "Barberton Daisy",
        //            Short_Description = "The Barberton daisy (Gerbera jamesonii), " +
        //            "also known as the Transvaal or Gerbera daisy, is a vibrant, " +
        //            "perennial flowering plant native to South Africa. " +
        //            "It is known for its large, brightly colored blooms that come " +
        //            "in a variety of shades such as red, pink, orange, and yellow, " +
        //            "making it a popular choice for gardens and floral arrangements.",
        //            Long_Description = "The Barberton daisy (Gerbera jamesonii), " +
        //            "also known as the Transvaal or Gerbera daisy, is a vibrant" +
        //            "perennial flowering plant native to South Africa." +
        //            "It is known for its large, brightly colored blooms that come \" +\r\n                    \"in a variety of shades such as red, pink, orange, and yellow, \" +\r\n                    \"making it a popular choice for gardens and floral arrangements."
        //        }
        //    );
        //}
    }
}

