using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Modules;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Newsletter
{
    public class NewPlantNewsletterCreator(INewsletterContent newsletterContent) : 
        INewsletterCreator
    {
        private readonly INewsletterContent _newsletterContent = 
            newsletterContent;

        public MailMessage CreateNewsletter(
            string from, 
            NewsletterHeader header)
        {
            string subject = "New Plant in the shop!";
            string title = "Are you ready for a new purchase?";
            string body = $"We have a new arrival - {header.Details}. " +
                $"If you are ready to decorate your ambient with " +
                $"this amazing product, check it out on our website " +
                $"for price and details. And hurry up - this plant may " +
                $"not stay forever in our shop!";

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
