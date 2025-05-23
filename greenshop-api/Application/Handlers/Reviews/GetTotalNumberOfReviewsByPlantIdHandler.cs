using greenshop_api.Application.Queries.Reviews;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class GetTotalNumberOfReviewsByPlantIdHandler(IReviewsRepository reviewsRepository) : 
        IRequestHandler<GetTotalNumberOfReviewsByPlantIdQuery, int>
    {
        private readonly IReviewsRepository _reviewsRepository = 
            reviewsRepository;
        public async Task<int> Handle(
            GetTotalNumberOfReviewsByPlantIdQuery request, 
            CancellationToken cancellationToken)
        {
            return await _reviewsRepository
                .GetTotalNumberOfReviewsByPlantIdAsync(request.PlantId!);
        }
    }
}
