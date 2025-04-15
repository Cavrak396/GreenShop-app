using AutoMapper;
using greenshop_api.Application.Queries.Subscribers;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Subscribers;
using MediatR;

namespace greenshop_api.Application.Handlers.Subscribers
{
    public class GetSubscriberByEmailHandler(
        ISubscribersRepository subscribersRepository, 
        IMapper mapper) : IRequestHandler<GetSubscriberByEmailQuery, SubscriberDto>
    {
        private readonly ISubscribersRepository _subscribersRepository = subscribersRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<SubscriberDto> Handle(GetSubscriberByEmailQuery request, CancellationToken cancellationToken)
        {
            var subscriber = await _subscribersRepository.GetSubscriberByEmailAsync(request.Email!);
            return _mapper.Map<SubscriberDto>(subscriber);
        }
    }
}
