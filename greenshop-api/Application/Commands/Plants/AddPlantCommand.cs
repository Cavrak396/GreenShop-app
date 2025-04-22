using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Plants;
using MediatR;

namespace greenshop_api.Application.Commands.Plants
{
    public class AddPlantCommand : IRequest<Plant>
    {
        public PostPlantDto? Plant {  get; set; } 
    }
}
