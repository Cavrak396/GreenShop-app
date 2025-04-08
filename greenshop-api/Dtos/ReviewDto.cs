using greenshop_api.Domain.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class ReviewDto
    {
        [Required]
        [UsernameIsValid]
        public string? UserName { get; set; }
        [Required]
        public string? PlantId { get; set; }
        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }
        [Required]
        [DateNotInTheFuture]
        public DateTime Creation_Date { get; set; }
        public string? Comment { get; set; }
    }
}
