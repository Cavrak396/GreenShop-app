using AutoMapper;
using greenshop_api.Application.Commands.Subscribers;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using MediatR;

namespace greenshop_api.Application.Handlers.Subscribers
{
    public class AddSubscriberHandler(
        ISubscribersRepository subscribersRepository, 
        IMapper mapper) : IRequestHandler<AddSubscriberCommand, Unit>
    {
        private readonly ISubscribersRepository _subscribersRepository = subscribersRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Unit> Handle(AddSubscriberCommand request, CancellationToken cancellationToken)
        {
            var subscriber = _mapper.Map<Subscriber>(request.Subscriber);
            await _subscribersRepository.AddSubscriberAsync(subscriber);
            return Unit.Value;
        }
    }
}
