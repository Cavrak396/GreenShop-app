using greenshop_api.Domain.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
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
