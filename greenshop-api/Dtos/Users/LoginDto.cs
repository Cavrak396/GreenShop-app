using greenshop_api.Domain.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.Users
{
    public class LoginDto
    {
        [Required]
        [EmailIsValid]
        public string? Email { get; set; }
        [Required]
        [PasswordIsValid]
        public string? Password { get; set; }
    }
}
