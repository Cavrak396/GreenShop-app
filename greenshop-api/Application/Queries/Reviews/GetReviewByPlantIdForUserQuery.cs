using greenshop_api.Dtos.Reviews;
using MediatR;

namespace greenshop_api.Application.Queries.Reviews
{
    public class GetReviewByPlantIdForUserQuery : IRequest<GetReviewDto?>
    {
        public string? PlantId { get; set; }
    }
}
