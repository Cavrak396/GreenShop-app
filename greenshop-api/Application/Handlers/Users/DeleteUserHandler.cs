using greenshop_api.Application.Commands.Users;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Users
{
    public class DeleteUserHandler(
        IUsersRepository usersRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor) : IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IUsersRepository _usersRepository = usersRepository;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?.Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();
            var userToDelete = await _usersRepository.GetUserByIdAsync(userId);

            await _usersRepository.DeleteUserAsync(userToDelete!);
            return Unit.Value;
        }
    }
}
