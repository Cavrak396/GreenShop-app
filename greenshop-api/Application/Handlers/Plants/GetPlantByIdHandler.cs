using AutoMapper;
using greenshop_api.Application.Queries.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Plants;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetPlantByIdHandler(
        IPlantsRepository plantsRepository,
        IMapper mapper) : IRequestHandler<GetPlantByIdQuery, GetPlantDto>
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<GetPlantDto> Handle(GetPlantByIdQuery request, CancellationToken cancellationToken)
        {
            var plant = await _plantsRepository.GetPlantByIdAsync(request.Id!);
            return _mapper.Map<GetPlantDto>(plant);
        }
    }
}
