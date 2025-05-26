using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Infrastructure.Repositories
{
    public class ReviewsRepository(ApplicationDbContext dbContext) : 
        IReviewsRepository
    {
        private readonly ApplicationDbContext _dbContext = 
            dbContext;

        public IQueryable<Review> GetAllReviewsQueryable(string plantId)
        {
            return _dbContext.Reviews!
                .AsQueryable()
                .Where(r => r.PlantId == plantId);
        }

        public async Task<Review?> GetReviewByIdsAsync(
            string userId, 
            string plantId)
        {
            return await _dbContext.Reviews!
                .FindAsync(
                userId, 
                plantId);
        }

        public async Task<int> GetTotalNumberOfReviewsByPlantIdAsync(string plantId)
        {
            return await _dbContext.Reviews!
                .CountAsync(r => r.PlantId == plantId);
        }

        public async Task<int> GetNumberOfReviewsByRatingAndPlantIdAsync(
            string plantId, 
            int rating)
        {
            return await _dbContext.Reviews!
                .CountAsync(r => r.PlantId == plantId && 
                r.Rating == rating);
        }

        public async Task AddReviewAsync(Review review)
        {
            _dbContext.Reviews!
                .Add(review);
            await _dbContext
                .SaveChangesAsync();
        }

        public async Task UpdateReviewAsync(
            Review review, 
            Review newReview)
        {
            review.Rating = 
                newReview.Rating;
            review.Creation_Date = 
                newReview.Creation_Date;
            review.Comment = 
                newReview.Comment;

            await _dbContext
                .SaveChangesAsync();
        }
        public async Task DeleteReviewAsync(Review review)
        {
            _dbContext.Reviews!
                .Remove(review);
            await _dbContext
                .SaveChangesAsync();
        }
    }
}
