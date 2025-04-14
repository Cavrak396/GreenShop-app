using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.CartItems
{
    public class CartItemDto
    {
        [Required]
        public string? PlantId { get; set; }
        [Required]
        [Range(0, 20, ErrorMessage = "Quantity cannot be negative or greater than 20.")]
        public int Quantity { get; set; }
    }
}
