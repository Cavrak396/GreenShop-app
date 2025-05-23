using greenshop_api.Application.Commands.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class DeletePlantHandler(IPlantsRepository plantsRepository) : 
        IRequestHandler<DeletePlantCommand, Unit>
    {
        private readonly IPlantsRepository _plantsRepository = 
            plantsRepository;

        public async Task<Unit> Handle(
            DeletePlantCommand request, 
            CancellationToken cancellationToken)
        {
            var plant = await _plantsRepository
                .GetPlantByIdAsync(request.Id!);
            await _plantsRepository
                .DeletePlantAsync(plant!);

            return Unit.Value;
        }
    }
}
