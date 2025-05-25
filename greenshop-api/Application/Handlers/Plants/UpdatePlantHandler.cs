using AutoMapper;
using greenshop_api.Application.Commands.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class UpdatePlantHandler(
        IPlantsRepository plantsRepository,
        IMapper mapper) : 
        IRequestHandler<UpdatePlantCommand, Unit>
    {
        private readonly IPlantsRepository _plantsRepository = 
            plantsRepository;
        private readonly IMapper _mapper = 
            mapper;

        public async Task<Unit> Handle(
            UpdatePlantCommand request, 
            CancellationToken cancellationToken)
        {
            var plant = await _plantsRepository
                .GetPlantByIdAsync(request.Id!);
            var newPlant = _mapper
                .Map<Plant>(request.Plant);
            await _plantsRepository
                .UpdatePlantAsync(plant!, newPlant);

            return Unit.Value;
        }
    }
}
