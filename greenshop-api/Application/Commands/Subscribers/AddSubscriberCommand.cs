using greenshop_api.Dtos.Subscribers;
using MediatR;

namespace greenshop_api.Application.Commands.Subscribers
{
    public class AddSubscriberCommand : IRequest<Unit>
    {
        public SubscriberDto? Subscriber { get; set; }
    }
}
