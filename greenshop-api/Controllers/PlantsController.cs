using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters;
using greenshop_api.Filters.ExceptionFilters;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static greenshop_api.Models.Plant;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public PlantsController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Plant_ValidateGetHeaders]
        public async Task<IActionResult> GetPlants(
            [FromHeader(Name = "SearchValue")] string? search = null,
            [FromHeader(Name = "CategoryValue")] string? category = null,
            [FromHeader(Name = "SizeType")] string? size = null,
            [FromHeader(Name = "Group")] string? group = null,
            [FromHeader(Name = "PriceMin")] double? priceMin = null,
            [FromHeader(Name = "PriceMax")] double? priceMax = null,
            [FromHeader(Name = "Page")] int page = 1)
        {
            var plantsQuery = this.db.Plants.AsQueryable();

            if (!string.IsNullOrEmpty(group))
            {
                if (string.Equals(group, "new", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.OrderByDescending(p => p.Acquisition_Date).Take(9);
                }
                else if (string.Equals(group, "sale", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Sale_Percent > 0);
                }
            }

            if (!string.IsNullOrEmpty(search))
            {
                plantsQuery = plantsQuery.Where(p => p.Name != null && p.Name.Contains(search));
            }

            if (!string.IsNullOrEmpty(category))
            {
                plantsQuery = plantsQuery.Where(p => p.Category.ToLower() == category.ToLower());
            }

            if (!string.IsNullOrEmpty(size))
            {
                if (string.Equals(size, "small", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Size == SizeValue.S);
                }
                else if (string.Equals(size, "medium", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Size == SizeValue.M);
                }
                else if (string.Equals(size, "large", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Size == SizeValue.L || p.Size == SizeValue.XL);
                }
            }

            if(priceMin != null)
            {
                plantsQuery = plantsQuery.Where(p => p.Price >= priceMin);
            }

            if (priceMax != null)
            {
                plantsQuery = plantsQuery.Where(p => p.Price <= priceMax);
            }

            plantsQuery = plantsQuery.Skip((page - 1) * 9).Take(9);

            var plants = await plantsQuery.ToListAsync();

            return Ok(plants);
        }

        [HttpGet("{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetPlantById(long id)
        {
            var plant = await this.db.Plants.FindAsync(id);

            return Ok(plant);
        }

        [HttpGet("related/{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetRelatedProducts(long id)
        {
            var plant = await this.db.Plants.FindAsync(id);

            if (string.IsNullOrEmpty(plant.Tags))
            {
                var categoryRelatedProducts = await this.db.Plants
                    .Where(p => p.PlantId != id && p.Category == plant.Category)
                    .Take(5)
                    .ToListAsync();

                return Ok(categoryRelatedProducts);
            }

            var tags = plant.Tags.
                Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries).
                ToHashSet();

            var otherPlants = await this.db.Plants
                .Where(p => p.PlantId != id)
                .ToListAsync();

            var tagsRelatedProducts = otherPlants
                .Where(p => p.Tags != null &&
                             p.Tags.Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries)
                                   .Any(tag => tags.Contains(tag)))
                .Select(p => new
                {
                    Plant = p,
                    RelativityScore = p.Tags.Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries)
                                            .Count(tag => tags.Contains(tag))
                })
                .OrderByDescending(p => p.RelativityScore)
                .Take(5)
                .Select(p => p.Plant)
                .ToList();

            return Ok(tagsRelatedProducts);
        }

        [HttpPost]
        [TypeFilter(typeof(Plant_ValidateCreatePlantFilterAttribute))]
        public async Task<IActionResult> CreatePlant([FromBody]Plant plant)
        {
            string datePart = DateTime.UtcNow.ToString("yyyyMMdd");

            int identityPart = (await this.db.Plants.MaxAsync(i => (int?)i.PlantId % 10000) ?? 0) + 1;

            plant.PlantId = ApplicationDbContext.GeneratePlantId(datePart, identityPart);

            this.db.Plants.Add(plant);
            await this.db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlantById),
                new { id = plant.PlantId },
                plant);
        }

        [HttpPut]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [Plant_ValidateUpdatePlantFilter]
        [TypeFilter(typeof(Plant_HandleUpdateExceptionFilterAttribute))]
        public async Task <IActionResult> UpdatePlant(long id, [FromBody]Plant plant)
        {
            var plantToUpdate = await this.db.Plants.FindAsync(id);

            plantToUpdate.Name = plant.Name;
            plantToUpdate.Short_Description = plant.Short_Description;
            plantToUpdate.Long_Description = plant.Long_Description;
            plantToUpdate.Size = plant.Size;
            plantToUpdate.Category = plant.Category;
            plantToUpdate.Price = plant.Price;
            plantToUpdate.Image = plant.Image;
            plantToUpdate.Acquisition_Date = plant.Acquisition_Date;
            plantToUpdate.Tags = plant.Tags;
            plantToUpdate.Sale_Percent = plant.Sale_Percent;
            plantToUpdate.Sale_Percent_Private = plant.Sale_Percent_Private;
            plantToUpdate.LivingRoom_Description = plant.LivingRoom_Description;
            plantToUpdate.DiningRoom_Description = plant.DiningRoom_Description;
            plantToUpdate.Office_Description = plant.Office_Description;

            db.SaveChanges();

            return NoContent();

        }

        [HttpDelete]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task <IActionResult> DeletePlant(long id)
        {
            var plantToDelete = await this.db.Plants.FindAsync(id);

            db.Plants.Remove(plantToDelete);
            db.SaveChanges();

            return Ok(plantToDelete);
        }
    }
}
