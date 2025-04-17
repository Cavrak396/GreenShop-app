using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Modules;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Creators
{
    public class PurchaseNewsletterCreator(INewsletterContent newNewsletterContent) : INewsletterCreator
    {
        private readonly INewsletterContent _newsletterContent = newNewsletterContent;

        public MailMessage CreateNewsletter(string from, NewsletterHeader header)
        {
            string subject = "Successful Purchase at Miso Greenshop!";
            string title = $"Thank you for your trust, {header.Details}!";
            string body = "Purchased products will arrive as soon as possible to your address! " +
                          "In the meantime, you can take a look at the other plants in the shop " +
                          "and find something awesome at a current discount!";

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
