using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Domain.Models
{
    public class CartItem
    {
        [Required]
        public string? CartId { get; set; }
        public Cart? Cart { get; set; }
        [Required]
        public string? PlantId { get; set; }
        public Plant? Plant { get; set; }
        [Required]
        [Range(0, 20, ErrorMessage = "Quantity cannot be negative or greater than 20.")]
        public int Quantity { get; set; }
    }
}
