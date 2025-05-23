using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Modules;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Newsletter
{
    public class SubscriptionNewsletterCreator(INewsletterContent newsletterContent) : 
        INewsletterCreator
    {
        private readonly INewsletterContent _newsletterContent = 
            newsletterContent;

        public MailMessage CreateNewsletter(
            string from, 
            NewsletterHeader header)
        {
            string subject = "Welcome to Miso Greenshop Newsletter!";
            string title = "You will never miss a thing from now on!";
            string body = "We are so happy to have you here! Whenever there is a new product " +
                "in our store, you will be informed right away. This way, you can purchase " +
                "the plant while it's still in stock with the best prize.";

            string content = _newsletterContent
                .GenerateContent(
                title, 
                body);

            return new MailMessage(from, header.Recipient!)
            {
                Subject = subject,
                IsBodyHtml = true,
                Body = content
            };
        }
    }
}
