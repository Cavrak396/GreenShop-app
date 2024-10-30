using greenshop_api.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Models
{
	public class Plant
	{
        public enum SizeValue
        {
            S,
            M,
            L,
            XL
        }

        [Key]
        public long? PlantId { get; set; }
        [Required(ErrorMessage = "Name is a required field!")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Short Description is a required field!")]
        public string? Short_Description { get; set; }
        [Required(ErrorMessage = "Long Description is a required field!")]
        public string? Long_Description { get; set; }
        [Required(ErrorMessage = "Size is a required field!")]
        public SizeValue Size { get; set; }
        [Required(ErrorMessage = "Category is a required field!")]
        public string? Category { get; set; }
        [Required(ErrorMessage = "Price is a required field!")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0!")]
        public double? Price { get; set; }
        [Required(ErrorMessage = "Image is a required field!")]
        public string? Image { get; set; }
        [Required(ErrorMessage = "Acquisition Date is a required field!")]
        [DateNotInTheFuture]
        public DateTime? Acquisition_Date { get; set; }
        public string? Tags { get; set; }
        [Range(0, 100, ErrorMessage = "Sale Percent must be between 0 and 100!")]
        public int Sale_Percent { get; set; }
        [Range(0, 100, ErrorMessage = "Sale Percent must be between 0 and 100!")]
        public int Sale_Percent_Private { get; set; }
        public string? LivingRoom_Description { get; set; }
        public string? DiningRoom_Description { get; set; }
        public string? Office_Description { get; set; }
    }
}