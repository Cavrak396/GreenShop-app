using greenshop_api.Dtos.Subscribers;
using MediatR;

namespace greenshop_api.Application.Queries.Subscribers
{
    public class GetAllSubscribersQuery() : IRequest<List<SubscriberDto>>
    {
    }
}
