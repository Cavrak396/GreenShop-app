using AutoMapper;
using AutoMapper.QueryableExtensions;
using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Service;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ExceptionFilters.Plant_ExceptionFilters;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static greenshop_api.Domain.Models.Plant;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly INewsletterService newsletterSender;
        private readonly IMapper mapper;

        public PlantsController(ApplicationDbContext db, INewsletterService newsletterSender, IMapper mapper)
        {
            this.db = db;
            this.newsletterSender = newsletterSender;
            this.mapper = mapper;
        }

        [HttpGet]
        [TypeFilter(typeof(Plant_ValidateGetHeadersActionFilter))]
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

            var plants = await plantsQuery.ProjectTo<PlantDto>(mapper.ConfigurationProvider).ToListAsync();

            return Ok(plants);
        }

        [HttpGet("total-number")]
        public async Task<IActionResult> GetTotalNumberOfPlants()
        {
            var count = await this.db.Plants.CountAsync();
            return Ok(count);
        }

        [HttpGet("category-number")]
        [TypeFilter(typeof(Plant_ValidateGetPlantNumberActionFilter))]
        public async Task<ActionResult<Dictionary<string, int>>> GetNumberOfPlantsByCategory([FromQuery] string[] categories)
        {
            var categoryCounts = new Dictionary<string, int>();

            foreach (var category in categories)
            {
                var count = await this.db.Plants.CountAsync(p => p.Category.ToLower().Trim() == category.ToLower().Trim());
                categoryCounts[category] = count;
            }
            return Ok(categoryCounts);
        }

        [HttpGet("size-number")]
        public async Task<ActionResult<Dictionary<string, int>>> GetNumberOfPlantsBySize()
        {
            var sizeCounts = new Dictionary<string, int>();

            var smallCount = await this.db.Plants.CountAsync(p => p.Size == SizeValue.S);
            var mediumCount = await this.db.Plants.CountAsync(p => p.Size == SizeValue.M);
            var largeCount = await this.db.Plants.CountAsync(p => p.Size == SizeValue.L || p.Size == SizeValue.XL);

            sizeCounts["Small"] = smallCount;
            sizeCounts["Medium"] = mediumCount;
            sizeCounts["Large"] = largeCount;

            return Ok(sizeCounts);
        }

        [HttpGet("{plantId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> GetPlantById(string plantId)
        {
            var plant = await this.db.Plants.FindAsync(plantId);
            var plantDto = mapper.Map<PlantDto>(plant);

            return Ok(plantDto);
        }

        [HttpGet("{plantId}/related")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> GetRelatedProducts(string plantId, [FromQuery] int relatedProductsSize = 5)
        {
            var plant = await this.db.Plants.FindAsync(plantId);

            if (string.IsNullOrEmpty(plant.Tags))
            {
                var categoryRelatedProducts = await this.db.Plants
                    .Where(p => p.PlantId != plantId && p.Category == plant.Category)
                    .Take(5)
                    .ToListAsync();

                return Ok(categoryRelatedProducts);
            }

            var tags = plant.Tags.
                Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries).
                ToHashSet();

            var otherPlants = await this.db.Plants
                .Where(p => p.PlantId != plantId)
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

            var tagsRelatedProductsDto = mapper.Map<List<PlantDto>>(tagsRelatedProducts);

            return Ok(tagsRelatedProductsDto);
        }

        [HttpPost]
        [TypeFilter(typeof(Plant_ValidateCreatePlantActionFilter))]
        public async Task<IActionResult> CreatePlant([FromBody]PlantDto plant)
        {
            var plantToCreate = mapper.Map<Plant>(plant);
            plantToCreate.PlantId = Guid.NewGuid().ToString();

            this.db.Plants.Add(plantToCreate);
            await this.db.SaveChangesAsync();

            var subscribers = await this.db.Subscribers.ToListAsync();

            if (subscribers.Count != 0) 
            {
                foreach (var subscriber in subscribers)
                {
                    await this.newsletterSender.SendNewsletterAsync(
                        "newPlant",
                        new NewsletterHeader
                        {
                            Recipient = subscriber.SubscriberEmail,
                            Details = plantToCreate.Name
                        }
                    );
                }
            }

            return NoContent();
        }

        [HttpPut("{plantId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(Plant_ValidateUpdatePlantActionFilter))]
        [TypeFilter(typeof(Plant_HandleUpdateExceptionFilter))]
        public async Task <IActionResult> UpdatePlant(string plantId, [FromBody]PlantDto plant)
        {
            var plantToUpdate = await this.db.Plants.FindAsync(plantId);

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

        [HttpDelete("{plantId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task <IActionResult> DeletePlant(string plantId)
        {
            var plantToDelete = await this.db.Plants.FindAsync(plantId);

            this.db.Plants.Remove(plantToDelete);
            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        [TypeFilter(typeof(Plant_ValidateDeletePlantsActionFilter))]
        public async Task<IActionResult> DeleteAllPlants()
        {
            var allPlants = this.db.Plants.ToList();

            this.db.Plants.RemoveRange(allPlants);
            await this.db.SaveChangesAsync();

            return NoContent();
        }
    }
}
