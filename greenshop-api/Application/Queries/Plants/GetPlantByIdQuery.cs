using greenshop_api.Dtos.Plants;
using MediatR;

namespace greenshop_api.Application.Queries.Plants
{
    public class GetPlantByIdQuery : IRequest<GetPlantDto>
    {
        public string? Id { get; set; }
    }
}
