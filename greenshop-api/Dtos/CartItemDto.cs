using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class CartItemDto
    {
        [Required]
        public string? PlantId { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity cannot be negative.")]
        public int Quantity { get; set; }
    }
}
