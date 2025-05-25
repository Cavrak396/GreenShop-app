using greenshop_api.Application.Commands.Subscribers;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Subscribers
{
    public class DeleteSubscriberHandler(ISubscribersRepository subscribersRepository) : 
        IRequestHandler<DeleteSubscriberCommand, Unit>
    {
        private readonly ISubscribersRepository _subscribersRepository = 
            subscribersRepository;

        public async Task<Unit> Handle(
            DeleteSubscriberCommand request, 
            CancellationToken cancellationToken)
        {
            var subscriber = await _subscribersRepository
                .GetSubscriberByEmailAsync(request.Email!);
            await _subscribersRepository
                .DeleteSubscriberAsync(subscriber!);

            return Unit.Value;
        }
    }
}
