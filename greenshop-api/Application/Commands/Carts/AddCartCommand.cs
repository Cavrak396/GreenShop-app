using greenshop_api.Dtos.CartItems;
using greenshop_api.Dtos.Carts;
using MediatR;

namespace greenshop_api.Application.Commands.Carts
{
    public class AddCartCommand : IRequest<CartDto>
    {
        public List<CartItemDto>? CartItems { get; set; }
    }
}
