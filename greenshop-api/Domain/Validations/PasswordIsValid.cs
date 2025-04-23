using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace greenshop_api.Domain.Validations
{
    public class PasswordIsValid : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value!.ToString()))
            {
                return new ValidationResult("Value for Password must be provided.");
            }

            string passwordValue = value!.ToString()!;

            if (passwordValue.Length < 8 || passwordValue.Length > 20
                || !Regex.IsMatch(passwordValue, "[A-Z]")
                || !Regex.IsMatch(passwordValue, "[a-z]")
                || !Regex.IsMatch(passwordValue, @"\d")
                || !Regex.IsMatch(passwordValue, @"[!-/:-@\[-_{-~]")
                || Regex.IsMatch(passwordValue, @"[^\dA-Za-z!-/:-@\[-_{-~]"))
            {
                return new ValidationResult("Password format is invalid");
            }

            return ValidationResult.Success;
        }
    }
}