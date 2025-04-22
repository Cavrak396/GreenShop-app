using greenshop_api.Application.Queries.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetTotalNumberOfPlantsHandler(IPlantsRepository plantsRepository) : IRequestHandler<GetTotalNumberOfPlantsQuery, int>
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;

        public Task<int> Handle(GetTotalNumberOfPlantsQuery request, CancellationToken cancellationToken)
        {
            return _plantsRepository.GetTotalNumberOfPlantsAsync();
        }
    }
}
