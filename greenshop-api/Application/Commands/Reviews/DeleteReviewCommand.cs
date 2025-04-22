using MediatR;

namespace greenshop_api.Application.Commands.Reviews
{
    public class DeleteReviewCommand : IRequest<Unit>
    {
        public string? PlantId { get; set; }
    }
}
