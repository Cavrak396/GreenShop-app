using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.Reviews
{
    public class PostReviewDto
    {
        [Required]
        public string? PlantId { get; set; }
        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }
        public string? Comment { get; set; }
    }
}
