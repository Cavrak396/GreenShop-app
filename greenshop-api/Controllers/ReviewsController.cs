using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.Review_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
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
        [TypeFilter(typeof(Review_ValidateReviewIdFilterAttribute))]
        public async Task<IActionResult> GetReviewById(string plantId, string userId)
        {
            var review = await this.db.Reviews.FindAsync(userId, plantId);

            return Ok(review);
        }

        [HttpGet("{plantId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        public async Task<IActionResult> GetReviewsByPlantId(string plantId)
        {
            IQueryable<Review> reviewsQuery = this.db.Reviews.AsQueryable();

            reviewsQuery = reviewsQuery.Where(r => r.PlantId == plantId);

            var reviews = await reviewsQuery.ToListAsync();

            return Ok(reviews);
        }

        [HttpPost]
        [TypeFilter(typeof(Review_ValidateCreateReviewFilterAttribute))]
        public async Task<IActionResult> CreateReview([FromBody] Review review)
        {
            this.db.Reviews.Add(review);
            await this.db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReviewById), new { 
                userId = review.UserId, 
                plantId = review.PlantId }, 
                review);
        }

        [HttpPut("{plantId}/{userId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateUpdateReviewFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateReviewIdFilterAttribute))]
        public async Task<IActionResult> UpdateReview(string plantId, string userId, [FromBody] Review review)
        {
            var reviewToUpdate = await this.db.Reviews.FindAsync(userId, plantId);

            reviewToUpdate.Rating = review.Rating;
            reviewToUpdate.Creation_Date = DateTime.Now;
            reviewToUpdate.Comment = review.Comment;

            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{plantId}/{userId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(User_ValidateUserIdFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateReviewIdFilterAttribute))]
        public async Task<IActionResult> DeleteReview(string plantId, string userId)
        {
            var reviewToDelete = await this.db.Reviews.FindAsync(userId, plantId);

            this.db.Reviews.Remove(reviewToDelete);
            await this.db.SaveChangesAsync();

            return Ok(reviewToDelete);
        }
    }
}
