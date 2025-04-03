using greenshop_api.Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class CartDto
    {
        public ICollection<CartItem>? CartItems { get; set; }
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Cart Price must be greater than 0.")]
        public double CartPrice { get; set; }
    }
}
