using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Models.Validations
{
    public class DateNotInTheFuture : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? objValue, ValidationContext validationContext)
        {
            if (objValue == null)
            {
                return new ValidationResult("Value for Date must be provided!");
            }

            var dateValue = objValue as DateTime? ?? new DateTime();

            if (dateValue.Date > DateTime.Now.Date)
            {
                return new ValidationResult("Date cannot be in the future!");
            }
            return ValidationResult.Success!;
        }
    }
}
