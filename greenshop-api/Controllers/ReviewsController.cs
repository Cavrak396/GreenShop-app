using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.UserActionFilters;
using greenshop_api.Models;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly NewsettlerService newsettlerService;

        public ReviewsController(ApplicationDbContext db, NewsettlerService newsettlerService)
        {
            this.db = db;
            this.newsettlerService = newsettlerService;
        }

        [HttpGet("{plantId}/{userId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        public async Task<IActionResult> GetReviews(string plantId, string userId)
        {
            IQueryable<Review> reviewsQuery = this.db.Reviews.AsQueryable();

            var reviews = await reviewsQuery.Where
            (
                r => r.PlantId == plantId &&
                r.UserId == userId
            ).ToListAsync();

            return Ok(reviews);
        }
    }
}
