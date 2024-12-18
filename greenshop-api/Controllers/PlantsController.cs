using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ExceptionFilters;
using greenshop_api.Models;
using greenshop_api.Services;
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
        private readonly NewsettlerService newsettlerService;

        public PlantsController(ApplicationDbContext db, NewsettlerService newsettlerService)
        {
            this.db = db;
            this.newsettlerService = newsettlerService;
        }

        [HttpGet]
        [Plant_ValidateGetHeaders]
        public async Task<IActionResult> GetPlants(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 9,
            [FromHeader(Name = "Authorized")] bool authorized = false,
            [FromHeader(Name = "SearchValue")] string? search = null,
            [FromHeader(Name = "CategoryValue")] string? category = null,
            [FromHeader(Name = "SizeType")] string? size = null,
            [FromHeader(Name = "Group")] string? group = null,
            [FromHeader(Name = "PriceMin")] double? priceMin = null,
            [FromHeader(Name = "PriceMax")] double? priceMax = null)
        {
            IQueryable<Plant> plantsQuery = this.db.Plants.AsQueryable();

            if (!string.IsNullOrEmpty(group))
            {
                if (string.Equals(group, "new", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.OrderByDescending(p => p.Acquisition_Date).Take(9);
                }
                else if (string.Equals(group, "sale", StringComparison.OrdinalIgnoreCase))
                {
                    if(authorized)
                    {
                        plantsQuery = plantsQuery.Where(p => p.Sale_Percent_Private > 0);
                    }
                    else
                    {
                        plantsQuery = plantsQuery.Where(p => p.Sale_Percent > 0);
                    }
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

            plantsQuery = plantsQuery.Skip((page - 1) * pageSize).Take(pageSize);

            var plants = await plantsQuery.ToListAsync();

            return Ok(plants);
        }

        [HttpGet("number")]
        [Plant_ValidateGetPlantNumberFilter]
        public async Task<ActionResult<Dictionary<string, int>>> GetNumberOfPlants([FromQuery] string[] categories)
        {
            var categoryCounts = new Dictionary<string, int>();

            foreach (var category in categories)
            {
                var count = await this.db.Plants.CountAsync(p => p.Category.ToLower().Trim() == category.ToLower().Trim());
                categoryCounts[category] = count;
            }
            return Ok(categoryCounts);
        }

        [HttpGet("{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetPlantById(string id)
        {
            var plant = await this.db.Plants.FindAsync(id);

            return Ok(plant);
        }

        [HttpGet("{id}/related")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetRelatedProducts(string id, [FromQuery] int relatedProductsSize = 5)
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
                .Take(relatedProductsSize)
                .Select(p => p.Plant)
                .ToList();

            return Ok(tagsRelatedProducts);
        }

        [HttpPost]
        [TypeFilter(typeof(Plant_ValidateCreatePlantFilterAttribute))]
        public async Task<IActionResult> CreatePlant([FromBody]Plant plant)
        {
            plant.PlantId = Guid.NewGuid().ToString();

            this.db.Plants.Add(plant);
            await this.db.SaveChangesAsync();

            var subscribers = await this.db.Subscribers.ToListAsync();

            if (subscribers.Count()!=0) 
            {
                foreach (var subscriber in subscribers)
                {
                    await newsettlerService.SendNewsettlerMessage(
                        subscriber.SubscriberEmail,
                        "New Plant in the shop!",
                        "Are you ready for new purchase?",
                        $"We have a new arrival - {plant.Name}. If you are ready to decorate " +
                        $"your ambient with this amazing product, check it out on our website " +
                        $"for price and details. And hurry up - this plant may not be forever in " +
                        $"our shop!"
                    );

                }
            }

            return CreatedAtAction(nameof(GetPlantById),
                new { id = plant.PlantId },
                plant);
        }

        [HttpPut("{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [Plant_ValidateUpdatePlantFilter]
        [TypeFilter(typeof(Plant_HandleUpdateExceptionFilterAttribute))]
        public async Task <IActionResult> UpdatePlant(string id, [FromBody]Plant plant)
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

            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task <IActionResult> DeletePlant(string id)
        {
            var plantToDelete = await this.db.Plants.FindAsync(id);

            this.db.Plants.Remove(plantToDelete);
            await this.db.SaveChangesAsync();

            return Ok(plantToDelete);
        }

        [HttpDelete]
        [TypeFilter(typeof(Plant_ValidateDeletePlantsFilterAttribute))]
        public async Task<IActionResult> DeleteAllPlants()
        {
            var allPlants = this.db.Plants.ToList();

            this.db.Plants.RemoveRange(allPlants);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}
