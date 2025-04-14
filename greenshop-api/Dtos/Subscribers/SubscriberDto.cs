using greenshop_api.Domain.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Dtos.Subscribers
{
    public class SubscriberDto
    {
        [Required]
        [EmailIsValid]
        public string? SubscriberEmail { get; set; }
    }
}
