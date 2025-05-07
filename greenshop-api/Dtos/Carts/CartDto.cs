using greenshop_api.Dtos.CartItems;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.Carts
{
    public class CartDto
    {
        public List<CartItemDto> CartItems { get; set; } = [];
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Cart Price must be greater than 0.")]
        public double CartPrice { get; set; }
    }
}
