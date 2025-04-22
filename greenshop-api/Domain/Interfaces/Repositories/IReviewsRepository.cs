using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface IReviewsRepository
    {
        IQueryable<Review> GetAllReviewsQueryable(string plantId);
        Task<Review?> GetReviewByIdsAsync(string userId, string plantId);
        Task<int> GetTotalNumberOfReviewsByPlantIdAsync(string plantId);
        Task AddReviewAsync(Review review);
        Task UpdateReviewAsync(Review review, Review newReview);
        Task DeleteReviewAsync(Review review);
    }
}
