using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Modules;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Newsletter
{
    public class RegistrationNewsletterCreator(INewsletterContent newsletterContent) : INewsletterCreator
    {
        private readonly INewsletterContent _newsletterContent = newsletterContent;

        public MailMessage CreateNewsletter(string from, NewsletterHeader header)
        {
            string subject = "You successfully joined Miso Greenshop family!";
            string title = $"Hello, {header.Details}, your registration process was successful!";
            string body = "Now you can log in and shop all your favorite products " +
                          "for awesome prices! You can also leave reviews for the " +
                          "products you purchased and enjoy many other features!";

            string content = _newsletterContent.GenerateContent(title, body);

            return new MailMessage(from, header.Recipient!)
            {
                Subject = subject,
                IsBodyHtml = true,
                Body = content
            };
        }

    }
}
