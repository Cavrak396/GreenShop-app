using greenshop_api.Application.Commands.Subscribers;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Subscribers
{
    public class DeleteSubscriberByEmailHandler(ISubscribersRepository subscribersRepository) : IRequestHandler<DeleteSubscriberByEmailCommand, Unit>
    {
        private readonly ISubscribersRepository _subscribersRepository = subscribersRepository;

        public async Task<Unit> Handle(DeleteSubscriberByEmailCommand request, CancellationToken cancellationToken)
        {
            await _subscribersRepository.DeleteSubscriberByEmailAsync(request.Email!);
            return Unit.Value;
        }
    }
}
