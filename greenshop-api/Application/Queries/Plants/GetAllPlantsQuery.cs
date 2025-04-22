using greenshop_api.Application.Models;
using MediatR;

namespace greenshop_api.Application.Queries.Plants
{
    public class GetAllPlantsQuery : IRequest<GetPlantsResponse>
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public bool Authorized { get; set; }
        public string? Key { get; set; }
        public string? Category { get; set; }
        public string? Size { get; set; }
        public string? Group { get; set; }
        public double? PriceMin { get; set; }
        public double? PriceMax { get; set; }
    }
}
