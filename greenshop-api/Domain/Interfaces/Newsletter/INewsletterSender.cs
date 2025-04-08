using greenshop_api.Application.Models;

namespace greenshop_api.Domain.Interfaces.Newsletter
{
    public interface INewsletterSender
    {
        Task SendNewsletterAsync(string newsletterType, NewsletterHeader message);
    }
}
