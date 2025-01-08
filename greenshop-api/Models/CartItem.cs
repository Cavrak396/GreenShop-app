using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Models
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
        [Range(0, int.MaxValue, ErrorMessage = "Quantity cannot be negative.")]
        public int Quantity { get; set; }
    }
}
