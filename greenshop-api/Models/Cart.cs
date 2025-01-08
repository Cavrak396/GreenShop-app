using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Models
{
    public class Cart
    {
        [Key]
        public string? CartId { get; set; }
        [Required]
        public string? UserId { get; set; }
        public User? User { get; set; }
        public ICollection<CartItem>? CartItems { get; set; }
        public double CartPrice { get; set; }
    }
}
