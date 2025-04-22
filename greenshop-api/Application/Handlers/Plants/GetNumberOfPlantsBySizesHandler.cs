using greenshop_api.Application.Queries.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;
using static greenshop_api.Domain.Models.Plant;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetNumberOfPlantsBySizesHandler(IPlantsRepository plantsRepository) : IRequestHandler<GetNumberOfPlantsBySizesQuery, Dictionary<string, int>>
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;

        public async Task<Dictionary<string, int>> Handle(GetNumberOfPlantsBySizesQuery request, CancellationToken cancellationToken)
        {
            var sizeCounts = new Dictionary<string, int>();

            var smallCount = await _plantsRepository.GetNumberOfPlantsBySizeAsync(SizeValue.S);
            var mediumCount = await _plantsRepository.GetNumberOfPlantsBySizeAsync(SizeValue.M);
            var largeCount = await _plantsRepository.GetNumberOfPlantsBySizeAsync(SizeValue.L);
            var extraLargeCount = await _plantsRepository.GetNumberOfPlantsBySizeAsync(SizeValue.XL);

            sizeCounts["Small"] = smallCount;
            sizeCounts["Medium"] = mediumCount;
            sizeCounts["Large"] = largeCount + extraLargeCount;

            return sizeCounts;
        }
    }
}
