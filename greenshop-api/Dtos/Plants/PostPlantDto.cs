using static greenshop_api.Domain.Models.Plant;
using System.ComponentModel.DataAnnotations;
using greenshop_api.Domain.Validations;

namespace greenshop_api.Dtos.Plants
{
    public class PostPlantDto
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Short_Description { get; set; }
        [Required]
        public string? Long_Description { get; set; }
        [Required]
        public SizeValue Size { get; set; }
        [Required]
        public string? Category { get; set; }
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public double? Price { get; set; }
        [Required]
        public string? Image { get; set; }
        [Required]
        [DateNotInTheFuture]
        public DateTime? Acquisition_Date { get; set; }
        public string? Tags { get; set; }
        [Range(0, 100, ErrorMessage = "Sale Percent must be between 0 and 100.")]
        public int Sale_Percent { get; set; }
        [Range(0, 100, ErrorMessage = "Sale Percent must be between 0 and 100.")]
        public int Sale_Percent_Private { get; set; }
        public string? LivingRoom_Description { get; set; }
        public string? DiningRoom_Description { get; set; }
        public string? Office_Description { get; set; }
    }
}
