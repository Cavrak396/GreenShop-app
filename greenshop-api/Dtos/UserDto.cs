using greenshop_api.Domain.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class UserDto
    {
        [Required]
        [EmailIsValid]
        public string? UserEmail { get; set; }
        [Required]
        [UsernameIsValid]
        public string? UserName { get; set; }
        [Required]
        public bool IsSubscribed { get; set; }
    }
}
