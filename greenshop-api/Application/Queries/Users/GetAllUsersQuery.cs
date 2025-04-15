using greenshop_api.Dtos.Users;
using MediatR;

namespace greenshop_api.Application.Queries.Users
{
    public class GetAllUsersQuery : IRequest<List<GetUserDto>>
    {
    }
}
