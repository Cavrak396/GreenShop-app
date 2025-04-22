using greenshop_api.Dtos.Plants;
using MediatR;

namespace greenshop_api.Application.Queries.Plants
{
    public class GetRelatedPlantsQuery : IRequest<List<GetPlantDto>>
    {
        public string? Id { get; set; }
        public int Count { get; set; }
    }
}
