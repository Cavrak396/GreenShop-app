using Microsoft.EntityFrameworkCore;
using greenshop_api.Models;

namespace greenshop_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Subscriber>(entity => { entity.HasIndex(e => e.SubscriberEmail).IsUnique(); });
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.UserEmail).IsUnique(); });

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

            modelBuilder.Entity<Plant>().HasData(
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Barberton Daisy",
                    Short_Description = "The Barberton daisy (Gerbera jamesonii), " +
                    "also known as the Transvaal or Gerbera daisy, is a vibrant, " +
                    "perennial flowering plant native to South Africa. " +
                    "It is known for its large, brightly colored blooms that come " +
                    "in a variety of shades such as red, pink, orange, and yellow, " +
                    "making it a popular choice for gardens and floral arrangements.",
                    Long_Description = "The Barberton daisy (Gerbera jamesonii), " +
                    "also known as the Transvaal or Gerbera daisy, is a vibrant" +
                    "perennial flowering plant native to South Africa." +
                    "It is known for its large, brightly colored blooms that come " +
                    "in a variety of shades such as red, pink, orange, and yellow, " +
                    "making it a popular choice for gardens and floral arrangements." +
                    "\nThe Barberton daisy typically blooms from late spring to fall, " +
                    "providing a long season of vibrant color. It thrives in well-drained " +
                    "soil and sunny locations, but can tolerate partial shade, making it a " +
                    "versatile option for both garden beds and pots. Indoors, it can be grown " +
                    "as a houseplant under bright, indirect light.",
                    Size = Plant.SizeValue.M,
                    Category = "Potter Plants",
                    Price = 119.00,
                    Image = "barbertonDaisy.png",
                    Acquisition_Date = new DateTime(2024, 9, 29),
                    Tags = "Home, Garden, Plants",
                    Sale_Percent = 0,
                    Sale_Percent_Private = 20,
                    LivingRoom_Description = "The Barberton daisy is a " +
                    "vibrant, easy-to-care-for plant that brings a pop of color to any living " +
                    "room with its large, bright blooms. Its air-purifying qualities make it a " +
                    "beautiful and functional addition to indoor spaces.",
                    DiningRoom_Description = "The Barberton daisy adds a cheerful touch to the " +
                    "dining room with its vivid, colorful flowers. Its ability to improve indoor " +
                    "air quality makes it a refreshing and attractive centerpiece for any dining space.",
                    Office_Description = "The Barberton daisy brightens up the office with its bold, " +
                    "colorful blooms, adding a touch of nature to the workspace. Its air-purifying " +
                    "properties also help create a healthier, more productive environment."
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Angel Wing Begonia",
                    Short_Description = "The Angel Wing begonia (Begonia corymbosa) is a stunning " +
                    "houseplant with large, wing-shaped leaves featuring silvery spots. It produces" +
                    " vibrant clusters of tubular flowers in pink, red, or white, adding elegance to" +
                    " any indoor space.",
                    Long_Description = "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with " +
                    "large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers " +
                    "in pink, red, or white, adding elegance to any indoor space.\nWith proper care, it can bloom throughout " +
                    "the year, providing continuous color and interest. The Angel Wing begonia is also known for its ability to " +
                    "improve indoor air quality, making it a beneficial addition to homes and offices alike. Its unique foliage " +
                    "and striking flowers make it a favorite among plant enthusiasts and decorators.",
                    Size = Plant.SizeValue.L,
                    Category = "Potter Plants",
                    Price = 169.00,
                    Image = "angelWingBegonia.png",
                    Acquisition_Date = new DateTime(2024, 10, 28),
                    Tags = "Potter, Garden, Plants",
                    Sale_Percent = 0,
                    Sale_Percent_Private = 10,
                    LivingRoom_Description = "The Angel Wing begonia brings a touch of elegance to the living" +
                    " room with its striking, wing-shaped leaves and vibrant clusters of tubular flowers. Its lush " +
                    "foliage and colorful blooms create a warm, inviting atmosphere while enhancing indoor air quality.",
                    DiningRoom_Description = "The Angel Wing begonia adds a charming focal point to the dining room " +
                    "with its unique, wing-shaped leaves and vibrant, tubular flowers. Its lush greenery and colorful" +
                    " blooms create a lively ambiance, making mealtime more inviting and enjoyable.",
                    Office_Description = "The Angel Wing begonia enhances the office environment with its " +
                    "distinctive wing-shaped leaves and bright, tubular flowers. Its lively appearance adds a touch" +
                    " of nature, helping to create a refreshing and inspiring workspace."
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "African Violet",
                    Short_Description = "The African violet (Saintpaulia) is a popular " +
                    "houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers " +
                    "that bloom in shades of purple, pink, and white. Easy to care for and requiring " +
                    "low light, it adds a cheerful touch to any indoor space, making it a favorite among" +
                    " plant enthusiasts.",
                    Long_Description = "The African violet (Saintpaulia) is a beloved houseplant known " +
                    "for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, " +
                    "pink, and white. This charming plant is easy to care for, thriving in low to moderate light " +
                    "conditions and preferring consistent moisture without waterlogging. With its compact size, " +
                    "the African violet fits perfectly on windowsills, desks, or shelves, bringing a cheerful touch " +
                    "to any indoor space.\nBlooming throughout the year with proper care, it can create a lively display " +
                    "of color and elegance. African violets are also known for their ability to adapt to various indoor " +
                    "environments, making them a popular choice for both beginners and experienced gardeners. " +
                    "Additionally, they can be propagated easily through leaf cuttings, allowing enthusiasts to share " +
                    "their beauty with friends and family.",
                    Size = Plant.SizeValue.M,
                    Category = "House Plants",
                    Price = 179.00,
                    Image = "africanViolet.png",
                    Acquisition_Date = new DateTime(2024, 10, 1),
                    Tags = "Home, Garden, Plants",
                    Sale_Percent = 13,
                    Sale_Percent_Private = 20,
                    LivingRoom_Description = "The African violet adds a delightful pop of color to the living " +
                    "room with its vibrant, fuzzy blooms in shades of purple, pink, and white. Its compact size and " +
                    "easy care make it a perfect choice for brightening up shelves or tabletops.",
                    DiningRoom_Description = "The African violet enhances the dining room " +
                    "with its charming, colorful blooms and soft, fuzzy leaves. Its vibrant " +
                    "flowers create a warm and inviting atmosphere, making mealtime feel more special.",
                    Office_Description = "The African violet brightens up the office with its cheerful, " +
                    "colorful blooms and lush, fuzzy foliage. Its low maintenance requirements and compact " +
                    "size make it an ideal plant for adding a touch of nature to your workspace."
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Beach Spider Lilly",
                    Short_Description = "The beach spider lily (Hymenocallis littoralis) is a striking " +
                    "coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall," +
                    " slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a " +
                    "unique beauty to seaside landscapes and gardens.",
                    Long_Description = "The beach spider lily (Hymenocallis littoralis) is a striking " +
                    "coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, " +
                    "slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a " +
                    "unique beauty to seaside landscapes and gardens.\nWith its long, narrow leaves forming " +
                    "a graceful rosette, the beach spider lily is not only visually appealing but also resilient" +
                    " to harsh coastal conditions, including salt and wind. This plant is often used in coastal " +
                    "gardens or as a border plant, where it can create a stunning display against the backdrop of " +
                    "the ocean. Additionally, its low maintenance requirements make it an excellent choice for " +
                    "gardeners looking to add tropical flair to their outdoor spaces.",
                    Size = Plant.SizeValue.L,
                    Category = "Gardening",
                    Price = 129.00,
                    Image = "beachSpiderLilly.png",
                    Acquisition_Date = new DateTime(2024, 10, 17),
                    Tags = "Home, Tropical, Plants",
                    Sale_Percent = 5,
                    Sale_Percent_Private = 15
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Blushing Bromeliad",
                    Short_Description = "The blushing bromeliad (Neoregalia carolinae) is a striking " +
                    "tropical plant known for its rosette of green leaves that turn a vibrant red or " +
                    "pink in the center when about to bloom. This low-maintenance plant thrives in bright," +
                    " indirect light, making it a popular choice for adding a splash of color to indoor spaces.",
                    Long_Description = "The blushing bromeliad (Neoregalia carolinae) is a striking " +
                    "tropical plant known for its rosette of green leaves that turn a vibrant red or pink in " +
                    "the center when about to bloom. This low-maintenance plant thrives in bright, indirect light," +
                    " making it a popular choice for adding a splash of color to indoor spaces.\nThriving in bright, " +
                    "indirect light and requiring minimal watering, the blushing bromeliad is an easy-care option " +
                    "for both novice and experienced gardeners. It absorbs water through its central \"tank,\" where" +
                    " moisture and nutrients can collect. With its compact size and low maintenance needs, this plant " +
                    "brings a splash of tropical color to living spaces, offices, or even outdoor patios.",
                    Size = Plant.SizeValue.XL,
                    Category = "House Plants",
                    Price = 139.00,
                    Image = "blushingBromeliad.png",
                    Acquisition_Date = new DateTime(2024, 10, 14),
                    Tags = "Home, Tropical, Plants",
                    Sale_Percent = 0,
                    Sale_Percent_Private = 10,
                    LivingRoom_Description = "The blushing bromeliad adds a vibrant touch to the living room " +
                    "with its striking green leaves that turn red or pink in the center. Its low-maintenance " +
                    "care and tropical flair make it a perfect choice for brightening up indoor spaces.",
                    DiningRoom_Description = "The blushing bromeliad brings a pop of color to the dining " +
                    "room with its vibrant center that turns red or pink as it matures. Its striking appearance " +
                    "and easy care make it an eye-catching addition to any dining space.",
                    Office_Description = "The blushing bromeliad adds a splash of vibrant color to the office with " +
                    "its striking red or pink center. Its low-maintenance nature and unique design make it a refreshing " +
                    "addition to the workspace."
                },
                new Plant
                {

                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Aluminum Plant",
                    Short_Description = "The aluminum plant (Pilea cadierei) is a striking houseplant" +
                    " known for its green leaves with distinctive silver markings, resembling metallic " +
                    "patterns. Easy to care for, it thrives in indirect light and adds a touch of " +
                    "unique texture to indoor spaces.",
                    Long_Description = "The aluminum plant (Pilea cadierei) is a striking houseplant" +
                    " known for its green leaves with distinctive silver markings, resembling metallic " +
                    "patterns. Easy to care for, it thrives in indirect light and adds a touch of " +
                    "unique texture to indoor spaces.\nIts compact size makes it ideal for tabletops, shelves, " +
                    "or small indoor spaces. The plant's vibrant foliage adds a unique texture and visual interest " +
                    "to any room. Easy to care for, the aluminum plant is a great option for both beginners and " +
                    "experienced plant lovers.",
                    Size = Plant.SizeValue.M,
                    Category = "Potter Plants",
                    Price = 179.00,
                    Image = "aluminumPlant.png",
                    Acquisition_Date = new DateTime(2024, 8, 15),
                    Tags = "Potter, Garden, Plants",
                    Sale_Percent = 0,
                    Sale_Percent_Private = 10,
                    LivingRoom_Description = "The aluminum plant adds a unique, eye-catching touch to the " +
                    "living room with its green leaves featuring striking silver markings. Its compact size and " +
                    "easy care make it a perfect choice for brightening up small spaces or shelves.",
                    DiningRoom_Description = "The aluminum plant brings a touch of elegance to the dining room with" +
                    " its vibrant green leaves and distinctive silver patterns. Its compact size makes it a great " +
                    "centerpiece or accent for tabletops, adding a fresh, lively feel to the space.",
                    Office_Description = "The aluminum plant adds a refreshing touch to the office with its vibrant " +
                    "green leaves and metallic silver markings. Its compact, low-maintenance nature makes it a perfect " +
                    "desk plant, bringing a bit of nature to the workspace."
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Bird's Nest Fern",
                    Short_Description = "The bird's nest fern (Asplenium nidus) is a lush," +
                    " tropical plant with bright green, wavy fronds that form a rosette shape " +
                    "resembling a bird's nest. Thriving in low to moderate light, it adds a touch " +
                    "of natural elegance to indoor spaces.",
                    Long_Description = "The bird's nest fern (Asplenium nidus) is a lush, " +
                    "tropical plant with bright green, wavy fronds that form a rosette shape " +
                    "resembling a bird's nest. Thriving in low to moderate light, it adds a touch" +
                    " of natural elegance to indoor spaces.\nEasy to care for, the bird’s nest fern requires " +
                    "regular misting or a humidity tray to maintain moisture and prefers well-draining soil to " +
                    "avoid root rot. Its bold, architectural shape makes it a stunning centerpiece or accent in " +
                    "both homes and offices.",
                    Size = Plant.SizeValue.S,
                    Category = "House Plants",
                    Price = 99.00,
                    Image = "birdsNestFern.png",
                    Acquisition_Date = new DateTime(2024, 9, 7),
                    Tags = "Home, Tropical, Plants",
                    Sale_Percent = 10,
                    Sale_Percent_Private = 25,
                    LivingRoom_Description = "The bird's nest fern adds a lush, tropical vibe to the living" +
                    " room with its bright green, wavy fronds that form a unique rosette shape. Its bold, elegant" +
                    " appearance and low-light tolerance make it an excellent choice for adding natural beauty " +
                    "to any indoor space.",
                    DiningRoom_Description = "The bird's nest fern brings a touch of tropical elegance to " +
                    "the dining room with its vibrant green, wavy fronds. Its graceful, rosette-shaped foliage" +
                    " adds a fresh, natural accent, creating a calm and inviting atmosphere for meals.",
                    Office_Description = "The bird's nest fern adds a calming, natural touch to the office " +
                    "with its bright green, wavy fronds. Its low-maintenance care and unique rosette shape make " +
                    "it an ideal plant for enhancing the workspace with a refreshing, tropical feel."
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Broadleaf Lady Palm",
                    Short_Description = "The broadleaf lady palm (Rhapis excelsa) is an attractive " +
                    "garden plant known for its lush, fan-shaped fronds and graceful, slender stems. " +
                    "Thriving in partial shade, it adds a tropical touch to outdoor landscapes while " +
                    "providing a natural privacy screen or focal point in garden beds.",
                    Long_Description = "The broadleaf lady palm (Rhapis excelsa) is an attractive " +
                    "garden plant known for its lush, fan-shaped fronds and graceful, slender stems. " +
                    "Thriving in partial shade, it adds a tropical touch to outdoor landscapes while " +
                    "providing a natural privacy screen or focal point in garden beds.\nWith its ability " +
                    "to grow up to 10 feet tall, the broadleaf lady palm creates a striking visual " +
                    "presence in any garden setting. Its dense foliage not only enhances the aesthetic " +
                    "appeal but also offers shelter for birds and other wildlife. Easy to maintain, " +
                    "this palm requires minimal care and can withstand drought once established, making " +
                    "it an excellent addition to low-maintenance gardens.",
                    Size = Plant.SizeValue.S,
                    Category = "Gardening",
                    Price = 59.00,
                    Image = "broadleafLadyPalm.png",
                    Acquisition_Date = new DateTime(2024, 8, 25),
                    Tags = "Palm, Garden, Plants",
                    Sale_Percent = 10,
                    Sale_Percent_Private = 25
                },
                new Plant
                {
                    PlantId = Guid.NewGuid().ToString(),
                    Name = "Chinese Evergreen",
                    Short_Description = "The Chinese evergreen (Aglaonema) is a resilient garden" +
                    " plant known for its lush, glossy leaves and attractive variegation in shades" +
                    " of green, silver, and cream. Thriving in low to moderate light, it adds vibrant" +
                    " color and texture to shaded garden areas while requiring minimal maintenance.",
                    Long_Description = "The Chinese evergreen (Aglaonema) is a resilient garden plant " +
                    "known for its lush, glossy leaves and attractive variegation in shades of green, " +
                    "silver, and cream. Thriving in low to moderate light, it adds vibrant color and " +
                    "texture to shaded garden areas while requiring minimal maintenance.\nWith its " +
                    "ability to grow up to 3 feet tall, the Chinese evergreen makes a striking addition" +
                    " to borders or containers, creating a beautiful focal point in any garden setting. " +
                    "It is also known for its air-purifying qualities, helping to improve the overall " +
                    "environment in which it grows. Given its hardiness and easy care, the Chinese " +
                    "evergreen is a favorite among gardeners looking to add life and color to shaded " +
                    "or low-light areas.",
                    Size = Plant.SizeValue.S,
                    Category = "Gardening",
                    Price = 39.00,
                    Image = "chineseEvergreen.png",
                    Acquisition_Date = new DateTime(2024, 8, 28),
                    Tags = "Garden, Hanging, Plants",
                    Sale_Percent = 10,
                    Sale_Percent_Private = 25
                }
            );
        }
    }
}

