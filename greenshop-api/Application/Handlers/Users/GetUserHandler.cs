using AutoMapper;
using greenshop_api.Application.Queries.Users;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Users;
using MediatR;

namespace greenshop_api.Application.Handlers.Users
{
    public class GetUserHandler(
        IUsersRepository usersRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : 
        IRequestHandler<GetUserQuery, GetUserDto>
    {
        private readonly IUsersRepository _usersRepository = 
            usersRepository;
        private readonly IJwtService _jwtService = 
            jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = 
            httpContextAccessor;
        private readonly IMapper _mapper = 
            mapper;

        public async Task<GetUserDto> Handle(
            GetUserQuery request, 
            CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?
                .Request.Cookies["jwt"];
            var token = _jwtService
                .Verify(jwt!);
            var userId = token.Issuer
                .ToString();
            var user = await _usersRepository
                .GetUserByIdAsync(userId);

            return _mapper
                .Map<GetUserDto>(user);
        }
    }
}
