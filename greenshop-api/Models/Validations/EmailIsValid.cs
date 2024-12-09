using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text.RegularExpressions;

namespace greenshop_api.Models.Validations
{
    public class EmailIsValid : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return new ValidationResult("Value for Email must be provided.");
            }

            string emailValue = value.ToString();

            try
            {
                emailValue = Regex.Replace(emailValue, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));
            }
            catch (RegexMatchTimeoutException)
            {
                return new ValidationResult("Email validation timed out.");
            }
            catch (ArgumentException e)
            {
                return new ValidationResult("Email format is invalid.");
            }

            if (!Regex.IsMatch(emailValue, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", 
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250)))
            {
                return new ValidationResult("Email format is invalid.");
            }

            return ValidationResult.Success;
        }

        private static string DomainMapper(Match match)
        {
            var idn = new IdnMapping();

            string domainName = idn.GetAscii(match.Groups[2].Value);

            return match.Groups[1].Value + domainName;
        }
    }
}
