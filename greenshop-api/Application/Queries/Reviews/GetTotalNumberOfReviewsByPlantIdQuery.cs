using MediatR;

namespace greenshop_api.Application.Queries.Reviews
{
    public class GetTotalNumberOfReviewsByPlantIdQuery : IRequest<int>
    {
        public string? PlantId { get; set; }
    }
}
