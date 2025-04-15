using AutoMapper;
using greenshop_api.Application.Queries.Subscribers;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Subscribers;
using MediatR;

namespace greenshop_api.Application.Handlers.Subscribers
{
    public class GetAllSubscribersHandler(
        ISubscribersRepository subscribersRepository,
        IMapper mapper) : IRequestHandler<GetAllSubscribersQuery, List<SubscriberDto>>
    {
        private readonly ISubscribersRepository _subscribersRepository = subscribersRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<List<SubscriberDto>> Handle(GetAllSubscribersQuery request, CancellationToken cancellationToken)
        {
            var subscribers = await _subscribersRepository.GetAllSubscribersAsync();
            return _mapper.Map<List<SubscriberDto>>(subscribers);
        }
    }
}
