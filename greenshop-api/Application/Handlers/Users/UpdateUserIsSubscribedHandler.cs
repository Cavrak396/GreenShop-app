using AutoMapper;
using greenshop_api.Application.Commands.Users;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using MediatR;

namespace greenshop_api.Application.Handlers.Users
{
    public class UpdateUserIsSubscribedHandler(
        IUsersRepository usersRepository,
        ISubscribersRepository subscribersRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : 
        IRequestHandler<UpdateUserIsSubscribedCommand, Unit>
    {
        private readonly IUsersRepository _usersRepository = 
            usersRepository;
        private readonly ISubscribersRepository _subscribersRepository = 
            subscribersRepository;
        private readonly IJwtService _jwtService = 
            jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = 
            httpContextAccessor;
        private readonly IMapper _mapper = 
            mapper;

        public async Task<Unit> Handle(
            UpdateUserIsSubscribedCommand request, 
            CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?
                .Request.Cookies["jwt"];
            var token = _jwtService
                .Verify(jwt!);
            var userId = token.Issuer
                .ToString();
            var userToUpdate = await _usersRepository
                .GetUserByIdAsync(userId);

            var subscriber = await _subscribersRepository
                .GetSubscriberByEmailAsync(userToUpdate!.UserEmail!);

            if (userToUpdate.IsSubscribed && 
                subscriber == null)
            {
                var subscriberToCreate = _mapper
                    .Map<Subscriber>(userToUpdate);
                await _subscribersRepository
                    .AddSubscriberAsync(subscriberToCreate);
            }
            
            if (!userToUpdate.IsSubscribed && 
                subscriber != null)
            {
                await _subscribersRepository
                    .DeleteSubscriberAsync(subscriber);
            }

            await _usersRepository
                .UpdateUserIsSubscribedAsync(
                userToUpdate!, 
                request.IsSubscribed);

            return Unit.Value;
        }
    }
}
