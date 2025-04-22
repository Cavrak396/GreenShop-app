using greenshop_api.Dtos.Reviews;
using MediatR;

namespace greenshop_api.Application.Queries.Reviews
{
    public class GetAllReviewsByPlantIdQuery : IRequest<List<GetReviewDto>>
    {
        public string? PlantId { get; set; }
        public int Page {  get; set; }
        public int PageSize { get; set; }
    }
}
