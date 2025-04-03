using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Newsletter;
using greenshop_api.Domain.Interfaces.Smtp;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Services.Newsletter
{
    public class NewsletterSender : INewsletterSender
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ISmtpClientFactory _smtpClientFactory;
        private readonly Dictionary<string, Type> _newsletterTypeMap;

        public NewsletterSender(
            IServiceProvider serviceProvider,
            ISmtpClientFactory smtpClientFactory)
        {
            _serviceProvider = serviceProvider;
            _smtpClientFactory = smtpClientFactory;
            _newsletterTypeMap = new Dictionary<string, Type>
            {
                { "registration", typeof(RegistrationNewsletterCreator) },
                { "newPlant", typeof(NewPlantNewsletterCreator) },
                { "subscription", typeof(SubscriptionNewsletterCreator) },
            };
        }

        public async Task SendNewsletterAsync(string type, NewsletterHeader header)
        {
            string from = _smtpClientFactory.CreateClient().Credentials!.GetCredential("", 0, "")!.UserName;

            var newsletterType = _newsletterTypeMap[type];
            INewsletterCreator creator = (INewsletterCreator)_serviceProvider.GetService(newsletterType)!;

            MailMessage newsletter = creator.CreateNewsletter(from, header);

            using var client = _smtpClientFactory.CreateClient();
            try
            {
                await client.SendMailAsync(newsletter);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }
    }
}
