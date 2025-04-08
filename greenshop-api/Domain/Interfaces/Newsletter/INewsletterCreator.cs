using greenshop_api.Application.Models;
using System.Net.Mail;

namespace greenshop_api.Domain.Interfaces.Newsletter
{
    public interface INewsletterCreator
    {
        MailMessage CreateNewsletter(string from, NewsletterHeader header);
    }
}
