using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static greenshop_api.Models.Plant;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Plant_ValidateGetHeaders]
        public async Task<IActionResult> GetPlants(
            [FromHeader(Name = "SearchValue")] string? search = null,
            [FromHeader(Name = "CategoryValue")] string? category = null,
            [FromHeader(Name = "SizeType")] string? size = null,
            [FromHeader(Name = "Group")] string? group = null,
            [FromHeader(Name = "Page")] int page = 1)
        {
            var plantsQuery = _context.Plants.AsQueryable();

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

            plantsQuery = plantsQuery.Skip((page - 1) * 9).Take(9);

            var plants = await plantsQuery.ToListAsync();

            return Ok(plants);
        }

        [HttpGet("{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetPlantById(long id)
        {
            var plant = await _context.Plants.FindAsync(id);

            return Ok(plant);
        }

        [HttpGet("related/{id}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetRelatedProducts(long id)
        {
            var plant = await _context.Plants.FindAsync(id);

            if (string.IsNullOrEmpty(plant.Tags))
            {
                var categoryRelatedProducts = await _context.Plants
                    .Where(p => p.PlantId != id && p.Category == plant.Category)
                    .Take(5)
                    .ToListAsync();

                return Ok(categoryRelatedProducts);
            }

            var tags = plant.Tags.
                Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries).
                ToHashSet();

            var otherPlants = await _context.Plants
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
    }
}
