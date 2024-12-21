using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace greenshop_api.Migrations
{
    /// <inheritdoc />
    public partial class FixReviewTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Plants_PlantId",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Users_UserId",
                table: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Review",
                table: "Review");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "122e66a9-c352-4a0b-888b-332e35b7d045");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "1cbcfa3d-c3bd-4ee0-b27e-5c95e6f3007d");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "2066fb88-6db8-4a3a-910d-fa741d1d1261");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "313eab1c-57b1-4b7d-89ba-bf8d47679f15");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "690bdfce-5ef9-4097-8b9a-23ac212ed83b");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "6d05b9e9-0d27-4cfe-8d4a-557d28775630");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "6e7ca006-d1f0-4160-866c-2681dff9c274");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "a7f69d20-2195-4096-8a20-18e453cc2cce");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "cbb96c90-78d1-4412-b215-3ebcd7742b59");

            migrationBuilder.RenameTable(
                name: "Review",
                newName: "Reviews");

            migrationBuilder.RenameIndex(
                name: "IX_Review_PlantId",
                table: "Reviews",
                newName: "IX_Reviews_PlantId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                columns: new[] { "UserId", "PlantId" });

            migrationBuilder.InsertData(
                table: "Plants",
                columns: new[] { "PlantId", "Acquisition_Date", "Category", "DiningRoom_Description", "Image", "LivingRoom_Description", "Long_Description", "Name", "Office_Description", "Price", "Sale_Percent", "Sale_Percent_Private", "Short_Description", "Size", "Tags" },
                values: new object[,]
                {
                    { "15858ac7-8dea-4bf7-b631-8393009f01b4", new DateTime(2024, 8, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "chineseEvergreen.png", null, "The Chinese evergreen (Aglaonema) is a resilient garden plant known for its lush, glossy leaves and attractive variegation in shades of green, silver, and cream. Thriving in low to moderate light, it adds vibrant color and texture to shaded garden areas while requiring minimal maintenance.\nWith its ability to grow up to 3 feet tall, the Chinese evergreen makes a striking addition to borders or containers, creating a beautiful focal point in any garden setting. It is also known for its air-purifying qualities, helping to improve the overall environment in which it grows. Given its hardiness and easy care, the Chinese evergreen is a favorite among gardeners looking to add life and color to shaded or low-light areas.", "Chinese Evergreen", null, 39.0, 10, 25, "The Chinese evergreen (Aglaonema) is a resilient garden plant known for its lush, glossy leaves and attractive variegation in shades of green, silver, and cream. Thriving in low to moderate light, it adds vibrant color and texture to shaded garden areas while requiring minimal maintenance.", 0, "Garden, Hanging, Plants" },
                    { "24dc9d81-0978-4b2f-8dfe-33064872ec5a", new DateTime(2024, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The African violet enhances the dining room with its charming, colorful blooms and soft, fuzzy leaves. Its vibrant flowers create a warm and inviting atmosphere, making mealtime feel more special.", "africanViolet.png", "The African violet adds a delightful pop of color to the living room with its vibrant, fuzzy blooms in shades of purple, pink, and white. Its compact size and easy care make it a perfect choice for brightening up shelves or tabletops.", "The African violet (Saintpaulia) is a beloved houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, pink, and white. This charming plant is easy to care for, thriving in low to moderate light conditions and preferring consistent moisture without waterlogging. With its compact size, the African violet fits perfectly on windowsills, desks, or shelves, bringing a cheerful touch to any indoor space.\nBlooming throughout the year with proper care, it can create a lively display of color and elegance. African violets are also known for their ability to adapt to various indoor environments, making them a popular choice for both beginners and experienced gardeners. Additionally, they can be propagated easily through leaf cuttings, allowing enthusiasts to share their beauty with friends and family.", "African Violet", "The African violet brightens up the office with its cheerful, colorful blooms and lush, fuzzy foliage. Its low maintenance requirements and compact size make it an ideal plant for adding a touch of nature to your workspace.", 179.0, 13, 20, "The African violet (Saintpaulia) is a popular houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, pink, and white. Easy to care for and requiring low light, it adds a cheerful touch to any indoor space, making it a favorite among plant enthusiasts.", 1, "Home, Garden, Plants" },
                    { "33bc9f44-b2f1-4a14-902c-f811c18ee50c", new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The aluminum plant brings a touch of elegance to the dining room with its vibrant green leaves and distinctive silver patterns. Its compact size makes it a great centerpiece or accent for tabletops, adding a fresh, lively feel to the space.", "aluminumPlant.png", "The aluminum plant adds a unique, eye-catching touch to the living room with its green leaves featuring striking silver markings. Its compact size and easy care make it a perfect choice for brightening up small spaces or shelves.", "The aluminum plant (Pilea cadierei) is a striking houseplant known for its green leaves with distinctive silver markings, resembling metallic patterns. Easy to care for, it thrives in indirect light and adds a touch of unique texture to indoor spaces.\nIts compact size makes it ideal for tabletops, shelves, or small indoor spaces. The plant's vibrant foliage adds a unique texture and visual interest to any room. Easy to care for, the aluminum plant is a great option for both beginners and experienced plant lovers.", "Aluminum Plant", "The aluminum plant adds a refreshing touch to the office with its vibrant green leaves and metallic silver markings. Its compact, low-maintenance nature makes it a perfect desk plant, bringing a bit of nature to the workspace.", 179.0, 0, 10, "The aluminum plant (Pilea cadierei) is a striking houseplant known for its green leaves with distinctive silver markings, resembling metallic patterns. Easy to care for, it thrives in indirect light and adds a touch of unique texture to indoor spaces.", 1, "Potter, Garden, Plants" },
                    { "3729de2a-e626-4f7f-8eff-cf362fa87999", new DateTime(2024, 9, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The bird's nest fern brings a touch of tropical elegance to the dining room with its vibrant green, wavy fronds. Its graceful, rosette-shaped foliage adds a fresh, natural accent, creating a calm and inviting atmosphere for meals.", "birdsNestFern.png", "The bird's nest fern adds a lush, tropical vibe to the living room with its bright green, wavy fronds that form a unique rosette shape. Its bold, elegant appearance and low-light tolerance make it an excellent choice for adding natural beauty to any indoor space.", "The bird's nest fern (Asplenium nidus) is a lush, tropical plant with bright green, wavy fronds that form a rosette shape resembling a bird's nest. Thriving in low to moderate light, it adds a touch of natural elegance to indoor spaces.\nEasy to care for, the bird’s nest fern requires regular misting or a humidity tray to maintain moisture and prefers well-draining soil to avoid root rot. Its bold, architectural shape makes it a stunning centerpiece or accent in both homes and offices.", "Bird's Nest Fern", "The bird's nest fern adds a calming, natural touch to the office with its bright green, wavy fronds. Its low-maintenance care and unique rosette shape make it an ideal plant for enhancing the workspace with a refreshing, tropical feel.", 99.0, 10, 25, "The bird's nest fern (Asplenium nidus) is a lush, tropical plant with bright green, wavy fronds that form a rosette shape resembling a bird's nest. Thriving in low to moderate light, it adds a touch of natural elegance to indoor spaces.", 0, "Home, Tropical, Plants" },
                    { "43433478-c6aa-45b4-bd01-09d6ec4b5b89", new DateTime(2024, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The blushing bromeliad brings a pop of color to the dining room with its vibrant center that turns red or pink as it matures. Its striking appearance and easy care make it an eye-catching addition to any dining space.", "blushingBromeliad.png", "The blushing bromeliad adds a vibrant touch to the living room with its striking green leaves that turn red or pink in the center. Its low-maintenance care and tropical flair make it a perfect choice for brightening up indoor spaces.", "The blushing bromeliad (Neoregalia carolinae) is a striking tropical plant known for its rosette of green leaves that turn a vibrant red or pink in the center when about to bloom. This low-maintenance plant thrives in bright, indirect light, making it a popular choice for adding a splash of color to indoor spaces.\nThriving in bright, indirect light and requiring minimal watering, the blushing bromeliad is an easy-care option for both novice and experienced gardeners. It absorbs water through its central \"tank,\" where moisture and nutrients can collect. With its compact size and low maintenance needs, this plant brings a splash of tropical color to living spaces, offices, or even outdoor patios.", "Blushing Bromeliad", "The blushing bromeliad adds a splash of vibrant color to the office with its striking red or pink center. Its low-maintenance nature and unique design make it a refreshing addition to the workspace.", 139.0, 0, 10, "The blushing bromeliad (Neoregalia carolinae) is a striking tropical plant known for its rosette of green leaves that turn a vibrant red or pink in the center when about to bloom. This low-maintenance plant thrives in bright, indirect light, making it a popular choice for adding a splash of color to indoor spaces.", 3, "Home, Tropical, Plants" },
                    { "ac0db14e-f070-457a-b9d1-cec3f0d52c98", new DateTime(2024, 9, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The Barberton daisy adds a cheerful touch to the dining room with its vivid, colorful flowers. Its ability to improve indoor air quality makes it a refreshing and attractive centerpiece for any dining space.", "barbertonDaisy.png", "The Barberton daisy is a vibrant, easy-to-care-for plant that brings a pop of color to any living room with its large, bright blooms. Its air-purifying qualities make it a beautiful and functional addition to indoor spaces.", "The Barberton daisy (Gerbera jamesonii), also known as the Transvaal or Gerbera daisy, is a vibrantperennial flowering plant native to South Africa.It is known for its large, brightly colored blooms that come in a variety of shades such as red, pink, orange, and yellow, making it a popular choice for gardens and floral arrangements.\nThe Barberton daisy typically blooms from late spring to fall, providing a long season of vibrant color. It thrives in well-drained soil and sunny locations, but can tolerate partial shade, making it a versatile option for both garden beds and pots. Indoors, it can be grown as a houseplant under bright, indirect light.", "Barberton Daisy", "The Barberton daisy brightens up the office with its bold, colorful blooms, adding a touch of nature to the workspace. Its air-purifying properties also help create a healthier, more productive environment.", 119.0, 0, 20, "The Barberton daisy (Gerbera jamesonii), also known as the Transvaal or Gerbera daisy, is a vibrant, perennial flowering plant native to South Africa. It is known for its large, brightly colored blooms that come in a variety of shades such as red, pink, orange, and yellow, making it a popular choice for gardens and floral arrangements.", 1, "Home, Garden, Plants" },
                    { "ca4da99f-c779-4632-8aea-f863efbcd473", new DateTime(2024, 10, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The Angel Wing begonia adds a charming focal point to the dining room with its unique, wing-shaped leaves and vibrant, tubular flowers. Its lush greenery and colorful blooms create a lively ambiance, making mealtime more inviting and enjoyable.", "angelWingBegonia.png", "The Angel Wing begonia brings a touch of elegance to the living room with its striking, wing-shaped leaves and vibrant clusters of tubular flowers. Its lush foliage and colorful blooms create a warm, inviting atmosphere while enhancing indoor air quality.", "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers in pink, red, or white, adding elegance to any indoor space.\nWith proper care, it can bloom throughout the year, providing continuous color and interest. The Angel Wing begonia is also known for its ability to improve indoor air quality, making it a beneficial addition to homes and offices alike. Its unique foliage and striking flowers make it a favorite among plant enthusiasts and decorators.", "Angel Wing Begonia", "The Angel Wing begonia enhances the office environment with its distinctive wing-shaped leaves and bright, tubular flowers. Its lively appearance adds a touch of nature, helping to create a refreshing and inspiring workspace.", 169.0, 0, 10, "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers in pink, red, or white, adding elegance to any indoor space.", 2, "Potter, Garden, Plants" },
                    { "cab4af84-ade3-489f-9304-0581da7d7b65", new DateTime(2024, 10, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "beachSpiderLilly.png", null, "The beach spider lily (Hymenocallis littoralis) is a striking coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a unique beauty to seaside landscapes and gardens.\nWith its long, narrow leaves forming a graceful rosette, the beach spider lily is not only visually appealing but also resilient to harsh coastal conditions, including salt and wind. This plant is often used in coastal gardens or as a border plant, where it can create a stunning display against the backdrop of the ocean. Additionally, its low maintenance requirements make it an excellent choice for gardeners looking to add tropical flair to their outdoor spaces.", "Beach Spider Lilly", null, 129.0, 5, 15, "The beach spider lily (Hymenocallis littoralis) is a striking coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a unique beauty to seaside landscapes and gardens.", 2, "Home, Tropical, Plants" },
                    { "e3f2e181-f220-4744-bf4f-e353e24b3f9e", new DateTime(2024, 8, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "broadleafLadyPalm.png", null, "The broadleaf lady palm (Rhapis excelsa) is an attractive garden plant known for its lush, fan-shaped fronds and graceful, slender stems. Thriving in partial shade, it adds a tropical touch to outdoor landscapes while providing a natural privacy screen or focal point in garden beds.\nWith its ability to grow up to 10 feet tall, the broadleaf lady palm creates a striking visual presence in any garden setting. Its dense foliage not only enhances the aesthetic appeal but also offers shelter for birds and other wildlife. Easy to maintain, this palm requires minimal care and can withstand drought once established, making it an excellent addition to low-maintenance gardens.", "Broadleaf Lady Palm", null, 59.0, 10, 25, "The broadleaf lady palm (Rhapis excelsa) is an attractive garden plant known for its lush, fan-shaped fronds and graceful, slender stems. Thriving in partial shade, it adds a tropical touch to outdoor landscapes while providing a natural privacy screen or focal point in garden beds.", 0, "Palm, Garden, Plants" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Plants_PlantId",
                table: "Reviews",
                column: "PlantId",
                principalTable: "Plants",
                principalColumn: "PlantId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Plants_PlantId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "15858ac7-8dea-4bf7-b631-8393009f01b4");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "24dc9d81-0978-4b2f-8dfe-33064872ec5a");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "33bc9f44-b2f1-4a14-902c-f811c18ee50c");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "3729de2a-e626-4f7f-8eff-cf362fa87999");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "43433478-c6aa-45b4-bd01-09d6ec4b5b89");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "ac0db14e-f070-457a-b9d1-cec3f0d52c98");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "ca4da99f-c779-4632-8aea-f863efbcd473");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "cab4af84-ade3-489f-9304-0581da7d7b65");

            migrationBuilder.DeleteData(
                table: "Plants",
                keyColumn: "PlantId",
                keyValue: "e3f2e181-f220-4744-bf4f-e353e24b3f9e");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "Review");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_PlantId",
                table: "Review",
                newName: "IX_Review_PlantId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Review",
                table: "Review",
                columns: new[] { "UserId", "PlantId" });

            migrationBuilder.InsertData(
                table: "Plants",
                columns: new[] { "PlantId", "Acquisition_Date", "Category", "DiningRoom_Description", "Image", "LivingRoom_Description", "Long_Description", "Name", "Office_Description", "Price", "Sale_Percent", "Sale_Percent_Private", "Short_Description", "Size", "Tags" },
                values: new object[,]
                {
                    { "122e66a9-c352-4a0b-888b-332e35b7d045", new DateTime(2024, 8, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "chineseEvergreen.png", null, "The Chinese evergreen (Aglaonema) is a resilient garden plant known for its lush, glossy leaves and attractive variegation in shades of green, silver, and cream. Thriving in low to moderate light, it adds vibrant color and texture to shaded garden areas while requiring minimal maintenance.\nWith its ability to grow up to 3 feet tall, the Chinese evergreen makes a striking addition to borders or containers, creating a beautiful focal point in any garden setting. It is also known for its air-purifying qualities, helping to improve the overall environment in which it grows. Given its hardiness and easy care, the Chinese evergreen is a favorite among gardeners looking to add life and color to shaded or low-light areas.", "Chinese Evergreen", null, 39.0, 10, 25, "The Chinese evergreen (Aglaonema) is a resilient garden plant known for its lush, glossy leaves and attractive variegation in shades of green, silver, and cream. Thriving in low to moderate light, it adds vibrant color and texture to shaded garden areas while requiring minimal maintenance.", 0, "Garden, Hanging, Plants" },
                    { "1cbcfa3d-c3bd-4ee0-b27e-5c95e6f3007d", new DateTime(2024, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The blushing bromeliad brings a pop of color to the dining room with its vibrant center that turns red or pink as it matures. Its striking appearance and easy care make it an eye-catching addition to any dining space.", "blushingBromeliad.png", "The blushing bromeliad adds a vibrant touch to the living room with its striking green leaves that turn red or pink in the center. Its low-maintenance care and tropical flair make it a perfect choice for brightening up indoor spaces.", "The blushing bromeliad (Neoregalia carolinae) is a striking tropical plant known for its rosette of green leaves that turn a vibrant red or pink in the center when about to bloom. This low-maintenance plant thrives in bright, indirect light, making it a popular choice for adding a splash of color to indoor spaces.\nThriving in bright, indirect light and requiring minimal watering, the blushing bromeliad is an easy-care option for both novice and experienced gardeners. It absorbs water through its central \"tank,\" where moisture and nutrients can collect. With its compact size and low maintenance needs, this plant brings a splash of tropical color to living spaces, offices, or even outdoor patios.", "Blushing Bromeliad", "The blushing bromeliad adds a splash of vibrant color to the office with its striking red or pink center. Its low-maintenance nature and unique design make it a refreshing addition to the workspace.", 139.0, 0, 10, "The blushing bromeliad (Neoregalia carolinae) is a striking tropical plant known for its rosette of green leaves that turn a vibrant red or pink in the center when about to bloom. This low-maintenance plant thrives in bright, indirect light, making it a popular choice for adding a splash of color to indoor spaces.", 3, "Home, Tropical, Plants" },
                    { "2066fb88-6db8-4a3a-910d-fa741d1d1261", new DateTime(2024, 10, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "beachSpiderLilly.png", null, "The beach spider lily (Hymenocallis littoralis) is a striking coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a unique beauty to seaside landscapes and gardens.\nWith its long, narrow leaves forming a graceful rosette, the beach spider lily is not only visually appealing but also resilient to harsh coastal conditions, including salt and wind. This plant is often used in coastal gardens or as a border plant, where it can create a stunning display against the backdrop of the ocean. Additionally, its low maintenance requirements make it an excellent choice for gardeners looking to add tropical flair to their outdoor spaces.", "Beach Spider Lilly", null, 129.0, 5, 15, "The beach spider lily (Hymenocallis littoralis) is a striking coastal plant known for its dramatic, white, spider-like flowers that bloom atop tall, slender stems. Thriving in sandy soil and salt spray, this hardy perennial adds a unique beauty to seaside landscapes and gardens.", 2, "Home, Tropical, Plants" },
                    { "313eab1c-57b1-4b7d-89ba-bf8d47679f15", new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The aluminum plant brings a touch of elegance to the dining room with its vibrant green leaves and distinctive silver patterns. Its compact size makes it a great centerpiece or accent for tabletops, adding a fresh, lively feel to the space.", "aluminumPlant.png", "The aluminum plant adds a unique, eye-catching touch to the living room with its green leaves featuring striking silver markings. Its compact size and easy care make it a perfect choice for brightening up small spaces or shelves.", "The aluminum plant (Pilea cadierei) is a striking houseplant known for its green leaves with distinctive silver markings, resembling metallic patterns. Easy to care for, it thrives in indirect light and adds a touch of unique texture to indoor spaces.\nIts compact size makes it ideal for tabletops, shelves, or small indoor spaces. The plant's vibrant foliage adds a unique texture and visual interest to any room. Easy to care for, the aluminum plant is a great option for both beginners and experienced plant lovers.", "Aluminum Plant", "The aluminum plant adds a refreshing touch to the office with its vibrant green leaves and metallic silver markings. Its compact, low-maintenance nature makes it a perfect desk plant, bringing a bit of nature to the workspace.", 179.0, 0, 10, "The aluminum plant (Pilea cadierei) is a striking houseplant known for its green leaves with distinctive silver markings, resembling metallic patterns. Easy to care for, it thrives in indirect light and adds a touch of unique texture to indoor spaces.", 1, "Potter, Garden, Plants" },
                    { "690bdfce-5ef9-4097-8b9a-23ac212ed83b", new DateTime(2024, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The African violet enhances the dining room with its charming, colorful blooms and soft, fuzzy leaves. Its vibrant flowers create a warm and inviting atmosphere, making mealtime feel more special.", "africanViolet.png", "The African violet adds a delightful pop of color to the living room with its vibrant, fuzzy blooms in shades of purple, pink, and white. Its compact size and easy care make it a perfect choice for brightening up shelves or tabletops.", "The African violet (Saintpaulia) is a beloved houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, pink, and white. This charming plant is easy to care for, thriving in low to moderate light conditions and preferring consistent moisture without waterlogging. With its compact size, the African violet fits perfectly on windowsills, desks, or shelves, bringing a cheerful touch to any indoor space.\nBlooming throughout the year with proper care, it can create a lively display of color and elegance. African violets are also known for their ability to adapt to various indoor environments, making them a popular choice for both beginners and experienced gardeners. Additionally, they can be propagated easily through leaf cuttings, allowing enthusiasts to share their beauty with friends and family.", "African Violet", "The African violet brightens up the office with its cheerful, colorful blooms and lush, fuzzy foliage. Its low maintenance requirements and compact size make it an ideal plant for adding a touch of nature to your workspace.", 179.0, 13, 20, "The African violet (Saintpaulia) is a popular houseplant known for its soft, fuzzy leaves and vibrant, colorful flowers that bloom in shades of purple, pink, and white. Easy to care for and requiring low light, it adds a cheerful touch to any indoor space, making it a favorite among plant enthusiasts.", 1, "Home, Garden, Plants" },
                    { "6d05b9e9-0d27-4cfe-8d4a-557d28775630", new DateTime(2024, 10, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The Angel Wing begonia adds a charming focal point to the dining room with its unique, wing-shaped leaves and vibrant, tubular flowers. Its lush greenery and colorful blooms create a lively ambiance, making mealtime more inviting and enjoyable.", "angelWingBegonia.png", "The Angel Wing begonia brings a touch of elegance to the living room with its striking, wing-shaped leaves and vibrant clusters of tubular flowers. Its lush foliage and colorful blooms create a warm, inviting atmosphere while enhancing indoor air quality.", "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers in pink, red, or white, adding elegance to any indoor space.\nWith proper care, it can bloom throughout the year, providing continuous color and interest. The Angel Wing begonia is also known for its ability to improve indoor air quality, making it a beneficial addition to homes and offices alike. Its unique foliage and striking flowers make it a favorite among plant enthusiasts and decorators.", "Angel Wing Begonia", "The Angel Wing begonia enhances the office environment with its distinctive wing-shaped leaves and bright, tubular flowers. Its lively appearance adds a touch of nature, helping to create a refreshing and inspiring workspace.", 169.0, 0, 10, "The Angel Wing begonia (Begonia corymbosa) is a stunning houseplant with large, wing-shaped leaves featuring silvery spots. It produces vibrant clusters of tubular flowers in pink, red, or white, adding elegance to any indoor space.", 2, "Potter, Garden, Plants" },
                    { "6e7ca006-d1f0-4160-866c-2681dff9c274", new DateTime(2024, 8, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gardening", null, "broadleafLadyPalm.png", null, "The broadleaf lady palm (Rhapis excelsa) is an attractive garden plant known for its lush, fan-shaped fronds and graceful, slender stems. Thriving in partial shade, it adds a tropical touch to outdoor landscapes while providing a natural privacy screen or focal point in garden beds.\nWith its ability to grow up to 10 feet tall, the broadleaf lady palm creates a striking visual presence in any garden setting. Its dense foliage not only enhances the aesthetic appeal but also offers shelter for birds and other wildlife. Easy to maintain, this palm requires minimal care and can withstand drought once established, making it an excellent addition to low-maintenance gardens.", "Broadleaf Lady Palm", null, 59.0, 10, 25, "The broadleaf lady palm (Rhapis excelsa) is an attractive garden plant known for its lush, fan-shaped fronds and graceful, slender stems. Thriving in partial shade, it adds a tropical touch to outdoor landscapes while providing a natural privacy screen or focal point in garden beds.", 0, "Palm, Garden, Plants" },
                    { "a7f69d20-2195-4096-8a20-18e453cc2cce", new DateTime(2024, 9, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "House Plants", "The bird's nest fern brings a touch of tropical elegance to the dining room with its vibrant green, wavy fronds. Its graceful, rosette-shaped foliage adds a fresh, natural accent, creating a calm and inviting atmosphere for meals.", "birdsNestFern.png", "The bird's nest fern adds a lush, tropical vibe to the living room with its bright green, wavy fronds that form a unique rosette shape. Its bold, elegant appearance and low-light tolerance make it an excellent choice for adding natural beauty to any indoor space.", "The bird's nest fern (Asplenium nidus) is a lush, tropical plant with bright green, wavy fronds that form a rosette shape resembling a bird's nest. Thriving in low to moderate light, it adds a touch of natural elegance to indoor spaces.\nEasy to care for, the bird’s nest fern requires regular misting or a humidity tray to maintain moisture and prefers well-draining soil to avoid root rot. Its bold, architectural shape makes it a stunning centerpiece or accent in both homes and offices.", "Bird's Nest Fern", "The bird's nest fern adds a calming, natural touch to the office with its bright green, wavy fronds. Its low-maintenance care and unique rosette shape make it an ideal plant for enhancing the workspace with a refreshing, tropical feel.", 99.0, 10, 25, "The bird's nest fern (Asplenium nidus) is a lush, tropical plant with bright green, wavy fronds that form a rosette shape resembling a bird's nest. Thriving in low to moderate light, it adds a touch of natural elegance to indoor spaces.", 0, "Home, Tropical, Plants" },
                    { "cbb96c90-78d1-4412-b215-3ebcd7742b59", new DateTime(2024, 9, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Potter Plants", "The Barberton daisy adds a cheerful touch to the dining room with its vivid, colorful flowers. Its ability to improve indoor air quality makes it a refreshing and attractive centerpiece for any dining space.", "barbertonDaisy.png", "The Barberton daisy is a vibrant, easy-to-care-for plant that brings a pop of color to any living room with its large, bright blooms. Its air-purifying qualities make it a beautiful and functional addition to indoor spaces.", "The Barberton daisy (Gerbera jamesonii), also known as the Transvaal or Gerbera daisy, is a vibrantperennial flowering plant native to South Africa.It is known for its large, brightly colored blooms that come in a variety of shades such as red, pink, orange, and yellow, making it a popular choice for gardens and floral arrangements.\nThe Barberton daisy typically blooms from late spring to fall, providing a long season of vibrant color. It thrives in well-drained soil and sunny locations, but can tolerate partial shade, making it a versatile option for both garden beds and pots. Indoors, it can be grown as a houseplant under bright, indirect light.", "Barberton Daisy", "The Barberton daisy brightens up the office with its bold, colorful blooms, adding a touch of nature to the workspace. Its air-purifying properties also help create a healthier, more productive environment.", 119.0, 0, 20, "The Barberton daisy (Gerbera jamesonii), also known as the Transvaal or Gerbera daisy, is a vibrant, perennial flowering plant native to South Africa. It is known for its large, brightly colored blooms that come in a variety of shades such as red, pink, orange, and yellow, making it a popular choice for gardens and floral arrangements.", 1, "Home, Garden, Plants" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Plants_PlantId",
                table: "Review",
                column: "PlantId",
                principalTable: "Plants",
                principalColumn: "PlantId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Users_UserId",
                table: "Review",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
