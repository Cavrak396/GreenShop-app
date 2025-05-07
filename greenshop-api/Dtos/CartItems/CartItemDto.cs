using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.CartItems
{
    public class CartItemDto
    {
        [Required]
        public string? PlantId { get; set; }
        [Required]
        [Range(1, 20, ErrorMessage = "Quantity must be greater than 0 and cannot be over 20.")]
        public int Quantity { get; set; }
    }
}
