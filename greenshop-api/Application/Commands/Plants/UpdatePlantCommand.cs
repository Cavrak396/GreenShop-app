using greenshop_api.Dtos.Plants;
using MediatR;

namespace greenshop_api.Application.Commands.Plants
{
    public class UpdatePlantCommand : IRequest<Unit>
    {
        public string? Id { get; set; }
        public PostPlantDto? Plant { get; set; }
    }
}
