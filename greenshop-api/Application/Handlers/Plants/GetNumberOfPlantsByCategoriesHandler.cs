using greenshop_api.Application.Queries.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetNumberOfPlantsByCategoriesHandler(IPlantsRepository plantsRepository) : IRequestHandler<GetNumberOfPlantsByCategoriesQuery, Dictionary<string,int>>
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;

        public async Task<Dictionary<string, int>> Handle(GetNumberOfPlantsByCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categoryCounts = new Dictionary<string, int>();

            foreach (var category in request.Categories!)
            {
                var count = await _plantsRepository.GetNumberOfPlantsByCategory(category);
                categoryCounts[category.Trim()] = count;
            }
            return categoryCounts;
        }
    }
}
