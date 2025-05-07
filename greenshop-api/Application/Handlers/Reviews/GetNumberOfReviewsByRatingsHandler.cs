using greenshop_api.Application.Queries.Reviews;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class GetNumberOfReviewsByRatingsHandler(IReviewsRepository reviewsRepository) : IRequestHandler<GetNumberOfReviewsByRatingsQuery, Dictionary<int, int>>
    {
        private readonly IReviewsRepository _reviewsRepository = reviewsRepository;
        public async Task<Dictionary<int, int>> Handle(GetNumberOfReviewsByRatingsQuery request, CancellationToken cancellationToken)
        {
            var ratingCounts = new Dictionary<int, int>();

            for(int i=1; i<=5; i++)
            {
                var count = await _reviewsRepository.GetNumberOfReviewsByRatingAndPlantIdAsync(request.PlantId!, i);
                ratingCounts[i] = count;
            }

            return ratingCounts;
        }
    }
}
