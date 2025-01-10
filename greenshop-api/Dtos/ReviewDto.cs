using greenshop_api.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos
{
    public class ReviewDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? PlantId { get; set; }
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }
        [Required]
        [DateNotInTheFuture]
        public DateTime Creation_Date { get; set; }
        public string? Comment { get; set; }
    }
}
