using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace greenshop_api.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    PlantId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Short_Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Long_Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Size = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<double>(type: "double", nullable: false),
                    Image = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Acquisition_Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Tags = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sale_Percent = table.Column<int>(type: "int", nullable: false),
                    Sale_Percent_Private = table.Column<int>(type: "int", nullable: false),
                    LivingRoom_Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DiningRoom_Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Office_Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.PlantId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Subscribers",
                columns: table => new
                {
                    SubscriberId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SubscriberEmail = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscribers", x => x.SubscriberId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserEmail = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserPassword = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsSubscribed = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    CartId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CartPrice = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.CartId);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PlantId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Creation_Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Comment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => new { x.UserId, x.PlantId });
                    table.ForeignKey(
                        name: "FK_Reviews_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "PlantId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    CartId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PlantId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => new { x.CartId, x.PlantId });
                    table.ForeignKey(
                        name: "FK_CartItems_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "PlantId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Plants",
                columns: new[] { "PlantId", "Acquisition_Date", "Category", "DiningRoom_Description", "Image", "LivingRoom_Description", "Long_Description", "Name", "Office_Description", "Price", "Sale_Percent", "Sale_Percent_Private", "Short_Description", "Size", "Tags" },
                values: new object[,]
                {
                    { "0753e952-b67d-4fea-9163-d3f5eeba748f", new DateTime(2024, 10, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "beachSpiderLilly.png", null, "The beach spider lily (Hymenocallis littoralis) is a striking coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a unique beauty to seaside landscapes and gardens.\nWith its long, narrow leaves forming a graceful rosette, the beach spider lily is not only visually appealing but also resilient to harsh coastal conditions, including salt and wind. This plant is often used in coastal gardens or as a border plant, where it can create a stunning display against the backdrop of the ocean. Additionally, its low maintenance requirements make it an excellent choice for gardeners looking to add tropical flair to their outdoor spaces.", "Beach Spider Lilly", null, 129.0, 5, 15, "The beach spider lily (Hymenocallis littoralis) is a striking coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a unique beauty to seaside landscapes and gardens.", 2, "Home, Tropical, Plants" },
                    { "1c517bc7-967d-46b8-b2b6-099fe533af02", new DateTime(2024, 9, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The Barberton daisy adds a cheerful touch to the dining room with its vivid, colorful flowers. Its ability to improve indoor air quality makes it a refreshing and attractive centerpiece for any dining space.", "barbertonDaisy.png", "The Barberton daisy is a vibrant, easy-to-care-for plant that brings a pop of color to any living room with its large, bright blooms. Its air-purifying qualities make it a beautiful and functional addition to indoor spaces.", "The Barberton daisy (Gerbera jamesonii), also known as the Transvaal or Gerbera daisy, is a vibrantperennial flowering plant native to South Africa.It is known for its large, brightly colored blooms that come in a variety of shades such as red, pink, orange, and yellow, making it a popular choice for gardens and floral arrangements.\nThe Barberton daisy typically blooms from late spring to fall, providing a long season of vibrant color. It thrives in well-drained soil and sunny locations, but can tolerate partial shade, making it a versatile option for both garden beds and pots. Indoors, it can be grown as a houseplant under bright, indirect light.", "Barberton Daisy", "The Barberton daisy brightens up the office with its bold, colorful blooms, adding a touch of nature to the workspace. Its air-purifying properties also help create a healthier, more productive environment.", 119.0, 0, 20, "The Barberton daisy (Gerbera jamesonii), also known as the Transvaal or Gerbera daisy, is a vibrant, perennial flowering plant native to South Africa. It is known for its large, brightly colored blooms that come in a variety of shades such as red, pink, orange, and yellow, making it a popular choice for gardens and floral arrangements.", 1, "Home, Garden, Plants" },
                    { "71f1a41f-78b3-411c-8321-3da300a2bd39", new DateTime(2024, 9, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The bird's nest fern brings a touch of tropical elegance to the dining room with its vibrant green, wavy fronds. Its graceful, rosette-shaped foliage adds a fresh, natural accent, creating a calm and inviting atmosphere for meals.", "birdsNestFern.png", "The bird's nest fern adds a lush, tropical vibe to the living room with its bright green, wavy fronds that form a unique rosette shape. Its bold, elegant appearance and low-light tolerance make it an excellent choice for adding natural beauty to any indoor space.", "The bird's nest fern (Asplenium nidus) is a lush, tropical plant with bright green, wavy fronds that form a rosette shape resembling a bird's nest. Thriving in low to moderate light, it adds a touch of natural elegance to indoor spaces.\nEasy to care for, the bird’s nest fern requires regular misting or a humidity tray to maintain moisture and prefers well-draining soil to avoid root rot. Its bold, architectural shape makes it a stunning centerpiece or accent in both homes and offices.", "Bird's Nest Fern", "The bird's nest fern adds a calming, natural touch to the office with its bright green, wavy fronds. Its low-maintenance care and unique rosette shape make it an ideal plant for enhancing the workspace with a refreshing, tropical feel.", 99.0, 10, 25, "The bird's nest fern (Asplenium nidus) is a lush, tropical plant with bright green, wavy fronds that form a rosette shape resembling a bird's nest. Thriving in low to moderate light, it adds a touch of natural elegance to indoor spaces.", 0, "Home, Tropical, Plants" },
                    { "89fff02e-9fb8-428a-9b8f-a3bf17f8e95d", new DateTime(2024, 10, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The Angel Wing begonia adds a charming focal point to the dining room with its unique, wing-shaped leaves and vibrant, tubular flowers. Its lush greenery and colorful blooms create a lively ambiance, making mealtime more inviting and enjoyable.", "angelWingBegonia.png", "The Angel Wing begonia brings a touch of elegance to the living room with its striking, wing-shaped leaves and vibrant clusters of tubular flowers. Its lush foliage and colorful blooms create a warm, inviting atmosphere while enhancing indoor air quality.", "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers in pink, red, or white, adding elegance to any indoor space.\nWith proper care, it can bloom throughout the year, providing continuous color and interest. The Angel Wing begonia is also known for its ability to improve indoor air quality, making it a beneficial addition to homes and offices alike. Its unique foliage and striking flowers make it a favorite among plant enthusiasts and decorators.", "Angel Wing Begonia", "The Angel Wing begonia enhances the office environment with its distinctive wing-shaped leaves and bright, tubular flowers. Its lively appearance adds a touch of nature, helping to create a refreshing and inspiring workspace.", 169.0, 0, 10, "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers in pink, red, or white, adding elegance to any indoor space.", 2, "Potter, Garden, Plants" },
                    { "a2387018-906b-41a6-8b90-a15f79a3fe0b", new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The aluminum plant brings a touch of elegance to the dining room with its vibrant green leaves and distinctive silver patterns. Its compact size makes it a great centerpiece or accent for tabletops, adding a fresh, lively feel to the space.", "aluminumPlant.png", "The aluminum plant adds a unique, eye-catching touch to the living room with its green leaves featuring striking silver markings. Its compact size and easy care make it a perfect choice for brightening up small spaces or shelves.", "The aluminum plant (Pilea cadierei) is a striking houseplant known for its green leaves with distinctive silver markings, resembling metallic patterns. Easy to care for, it thrives in indirect light and adds a touch of unique texture to indoor spaces.\nIts compact size makes it ideal for tabletops, shelves, or small indoor spaces. The plant's vibrant foliage adds a unique texture and visual interest to any room. Easy to care for, the aluminum plant is a great option for both beginners and experienced plant lovers.", "Aluminum Plant", "The aluminum plant adds a refreshing touch to the office with its vibrant green leaves and metallic silver markings. Its compact, low-maintenance nature makes it a perfect desk plant, bringing a bit of nature to the workspace.", 179.0, 0, 10, "The aluminum plant (Pilea cadierei) is a striking houseplant known for its green leaves with distinctive silver markings, resembling metallic patterns. Easy to care for, it thrives in indirect light and adds a touch of unique texture to indoor spaces.", 1, "Potter, Garden, Plants" },
                    { "d252ec1a-5599-4a53-9aca-39972ee33163", new DateTime(2024, 8, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "broadleafLadyPalm.png", null, "The broadleaf lady palm (Rhapis excelsa) is an attractive garden plant known for its lush, fan-shaped fronds and graceful, slender stems. Thriving in partial shade, it adds a tropical touch to outdoor landscapes while providing a natural privacy screen or focal point in garden beds.\nWith its ability to grow up to 10 feet tall, the broadleaf lady palm creates a striking visual presence in any garden setting. Its dense foliage not only enhances the aesthetic appeal but also offers shelter for birds and other wildlife. Easy to maintain, this palm requires minimal care and can withstand drought once established, making it an excellent addition to low-maintenance gardens.", "Broadleaf Lady Palm", null, 59.0, 10, 25, "The broadleaf lady palm (Rhapis excelsa) is an attractive garden plant known for its lush, fan-shaped fronds and graceful, slender stems. Thriving in partial shade, it adds a tropical touch to outdoor landscapes while providing a natural privacy screen or focal point in garden beds.", 0, "Palm, Garden, Plants" },
                    { "d4cb9d04-2b80-406d-8b67-34a69ba92bf3", new DateTime(2024, 8, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "chineseEvergreen.png", null, "The Chinese evergreen (Aglaonema) is a resilient garden plant known for its lush, glossy leaves and attractive variegation in shades of green, silver, and cream. Thriving in low to moderate light, it adds vibrant color and texture to shaded garden areas while requiring minimal maintenance.\nWith its ability to grow up to 3 feet tall, the Chinese evergreen makes a striking addition to borders or containers, creating a beautiful focal point in any garden setting. It is also known for its air-purifying qualities, helping to improve the overall environment in which it grows. Given its hardiness and easy care, the Chinese evergreen is a favorite among gardeners looking to add life and color to shaded or low-light areas.", "Chinese Evergreen", null, 39.0, 10, 25, "The Chinese evergreen (Aglaonema) is a resilient garden plant known for its lush, glossy leaves and attractive variegation in shades of green, silver, and cream. Thriving in low to moderate light, it adds vibrant color and texture to shaded garden areas while requiring minimal maintenance.", 0, "Garden, Hanging, Plants" },
                    { "f97ea876-4686-4461-8b45-f497153c3637", new DateTime(2024, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The blushing bromeliad brings a pop of color to the dining room with its vibrant center that turns red or pink as it matures. Its striking appearance and easy care make it an eye-catching addition to any dining space.", "blushingBromeliad.png", "The blushing bromeliad adds a vibrant touch to the living room with its striking green leaves that turn red or pink in the center. Its low-maintenance care and tropical flair make it a perfect choice for brightening up indoor spaces.", "The blushing bromeliad (Neoregalia carolinae) is a striking tropical plant known for its rosette of green leaves that turn a vibrant red or pink in the center when about to bloom. This low-maintenance plant thrives in bright, indirect light, making it a popular choice for adding a splash of color to indoor spaces.\nThriving in bright, indirect light and requiring minimal watering, the blushing bromeliad is an easy-care option for both novice and experienced gardeners. It absorbs water through its central \"tank,\" where moisture and nutrients can collect. With its compact size and low maintenance needs, this plant brings a splash of tropical color to living spaces, offices, or even outdoor patios.", "Blushing Bromeliad", "The blushing bromeliad adds a splash of vibrant color to the office with its striking red or pink center. Its low-maintenance nature and unique design make it a refreshing addition to the workspace.", 139.0, 0, 10, "The blushing bromeliad (Neoregalia carolinae) is a striking tropical plant known for its rosette of green leaves that turn a vibrant red or pink in the center when about to bloom. This low-maintenance plant thrives in bright, indirect light, making it a popular choice for adding a splash of color to indoor spaces.", 3, "Home, Tropical, Plants" },
                    { "fa9f9393-d449-4aae-bab2-f332bf591e90", new DateTime(2024, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The African violet enhances the dining room with its charming, colorful blooms and soft, fuzzy leaves. Its vibrant flowers create a warm and inviting atmosphere, making mealtime feel more special.", "africanViolet.png", "The African violet adds a delightful pop of color to the living room with its vibrant, fuzzy blooms in shades of purple, pink, and white. Its compact size and easy care make it a perfect choice for brightening up shelves or tabletops.", "The African violet (Saintpaulia) is a beloved houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, pink, and white. This charming plant is easy to care for, thriving in low to moderate light conditions and preferring consistent moisture without waterlogging. With its compact size, the African violet fits perfectly on windowsills, desks, or shelves, bringing a cheerful touch to any indoor space.\nBlooming throughout the year with proper care, it can create a lively display of color and elegance. African violets are also known for their ability to adapt to various indoor environments, making them a popular choice for both beginners and experienced gardeners. Additionally, they can be propagated easily through leaf cuttings, allowing enthusiasts to share their beauty with friends and family.", "African Violet", "The African violet brightens up the office with its cheerful, colorful blooms and lush, fuzzy foliage. Its low maintenance requirements and compact size make it an ideal plant for adding a touch of nature to your workspace.", 179.0, 13, 20, "The African violet (Saintpaulia) is a popular houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, pink, and white. Easy to care for and requiring low light, it adds a cheerful touch to any indoor space, making it a favorite among plant enthusiasts.", 1, "Home, Garden, Plants" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId_PlantId",
                table: "CartItems",
                columns: new[] { "CartId", "PlantId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PlantId",
                table: "CartItems",
                column: "PlantId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_PlantId",
                table: "Reviews",
                column: "PlantId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscribers_SubscriberEmail",
                table: "Subscribers",
                column: "SubscriberEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserEmail",
                table: "Users",
                column: "UserEmail",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Subscribers");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Plants");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
