using greenshop_api.Dtos.Carts;
using MediatR;

namespace greenshop_api.Application.Commands.Carts
{
    public class DeleteCartItemsCommand : IRequest<CartDto>
    {
    }
}
