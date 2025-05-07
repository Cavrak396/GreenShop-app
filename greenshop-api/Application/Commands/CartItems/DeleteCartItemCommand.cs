using MediatR;

namespace greenshop_api.Application.Commands.CartItems
{
    public class DeleteCartItemCommand : IRequest<Unit>
    {
        public string? PlantId { get; set; }
    }
}
