using greenshop_api.Application.Models;
using System.Net.Mail;

namespace greenshop_api.Domain.Interfaces.Creators
{
    public interface INewsletterCreator
    {
        MailMessage CreateNewsletter(string from, NewsletterHeader header);
    }
}
