using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace greenshop_api.Models.Validations
{
    public class UsernameIsValid : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return new ValidationResult("Value for Username must be provided.");
            }
            string usernameValue = value.ToString();

            if (usernameValue.Length < 5 || usernameValue.Length > 20
                || !Regex.IsMatch(usernameValue, @"^[a-zA-Z0-9][a-zA-Z0-9_-]*$"))
            {
                return new ValidationResult("Username format is invalid");
            }

            return ValidationResult.Success;
        }
    }
}
