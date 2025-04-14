using greenshop_api.Domain.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.Users
{
    public class GetUserDto
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
