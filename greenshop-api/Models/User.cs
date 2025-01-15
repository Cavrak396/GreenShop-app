using greenshop_api.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Models
{
    public class User
    {
        [Key]
        public string? UserId { get; set; }
        [Required]
        [UsernameIsValid]
        public string? UserName { get; set; }
        [Required]
        [EmailIsValid]
        public string? UserEmail { get; set; }
        [Required]
        [PasswordIsValid]
        public string? UserPassword { get; set; }
        [Required]
        public bool IsSubscribed { get; set; } = false;
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<Cart>? Carts { get; set; }
    }
}
