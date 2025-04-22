using greenshop_api.Dtos.Reviews;
using MediatR;

namespace greenshop_api.Application.Commands.Reviews
{
    public class AddReviewCommand : IRequest<Unit>
    {
        public PostReviewDto? Review { get; set; }
    }
}
