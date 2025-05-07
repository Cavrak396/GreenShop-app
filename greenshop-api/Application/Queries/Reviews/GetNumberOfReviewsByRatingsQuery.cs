using MediatR;

namespace greenshop_api.Application.Queries.Reviews
{
    public class GetNumberOfReviewsByRatingsQuery : IRequest<Dictionary<int, int>>
    {
        public string? PlantId { get; set; }
    }
}
