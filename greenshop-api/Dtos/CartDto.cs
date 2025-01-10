using greenshop_api.Models;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class CartDto
    {
        public ICollection<CartItem>? CartItems { get; set; }
        [Required]
        public double CartPrice { get; set; }
    }
}
