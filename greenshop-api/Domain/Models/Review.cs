using greenshop_api.Domain.Models.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace greenshop_api.Domain.Models
{
    public class Review
    {
        [Required]
        public string? UserId { get; set; }
        [Required]
        public string? PlantId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        [ForeignKey("PlantId")]
        public Plant? Plant { get; set; }
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }
        [Required]
        [DateNotInTheFuture]
        public DateTime Creation_Date { get; set; }
        public string? Comment { get; set; }
    }
}
