using AutoMapper;
using greenshop_api.Application.Queries.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Plants;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetRelatedPlantsHandler(
        IPlantsRepository plantsRepository,
        IMapper mapper) : IRequestHandler<GetRelatedPlantsQuery, List<GetPlantDto>>
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<List<GetPlantDto>> Handle(GetRelatedPlantsQuery request, CancellationToken cancellationToken)
        {
            var plant = await _plantsRepository.GetPlantByIdAsync(request.Id!);
            List<Plant> otherPlants = await _plantsRepository.GetOtherPlantsAsync(request.Id!);

            if (string.IsNullOrEmpty(plant!.Tags))
            {
                var categoryRelatedProducts = otherPlants
                    .Where(p => p.Category == plant.Category)
                    .Take(5)
                    .ToList();

                return _mapper.Map<List<GetPlantDto>>(categoryRelatedProducts);
            }

            var tags = plant.Tags.
                Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries).
                ToHashSet();

            var tagsRelatedProducts = otherPlants
                .Where(p => p.Tags != null &&
                             p.Tags.Split([',', ' '], StringSplitOptions.RemoveEmptyEntries)
                                   .Any(tag => tags.Contains(tag)))
                .Select(p => new
                {
                    Plant = p,
                    RelativityScore = p.Tags?.Split([',', ' '], StringSplitOptions.RemoveEmptyEntries)
                                            .Count(tag => tags.Contains(tag))
                })
                .OrderByDescending(p => p.RelativityScore)
                .Take(request.Count)
                .Select(p => p.Plant)
                .ToList();

            return _mapper.Map<List<GetPlantDto>>(tagsRelatedProducts);
        }
    }
}
