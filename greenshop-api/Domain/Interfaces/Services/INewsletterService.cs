using greenshop_api.Application.Models;

namespace greenshop_api.Domain.Interfaces.Service
{
    public interface INewsletterService
    {
        Task SendNewsletterAsync(
            string newsletterType, 
            NewsletterHeader message);
    }
}
