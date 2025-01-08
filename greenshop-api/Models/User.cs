using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Models
{
    public class User
    {
        [Key]
        public string? UserId { get; set; }
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? UserEmail { get; set; }
        [Required]
        public string? UserPassword { get; set; }
        [Required]
        public bool IsSubscribed { get; set; } = false;
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<Cart>? Carts { get; set; }
    }
}
