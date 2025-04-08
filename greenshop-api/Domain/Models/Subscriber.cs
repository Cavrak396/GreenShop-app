using greenshop_api.Domain.Models.Validations;
using System.ComponentModel.DataAnnotations;

namespace greenshop_api.Domain.Models
{
    public class Subscriber
    {
        [Key]
        public string? SubscriberId { get; set; }
        [Required]
        [EmailIsValid]
        public string? SubscriberEmail { get; set; }
    }
}
