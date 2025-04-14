using greenshop_api.Domain.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Domain.Models
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
        public List<Review>? Reviews { get; set; }
        public List<Cart>? Carts { get; set; }
    }
}
