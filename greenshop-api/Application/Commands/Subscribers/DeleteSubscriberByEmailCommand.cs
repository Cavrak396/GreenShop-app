using MediatR;

namespace greenshop_api.Application.Commands.Subscribers
{
    public class DeleteSubscriberByEmailCommand : IRequest<Unit>
    {
        public string? Email { get; set; }
    }
}
