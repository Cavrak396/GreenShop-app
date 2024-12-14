using greenshop_api.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        [EmailIsValid]
        public string? Email { get; set; }
        [Required]
        [PasswordIsValid]
        public string? Password { get; set; }
    }
}
