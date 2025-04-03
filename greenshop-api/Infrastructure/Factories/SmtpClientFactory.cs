using greenshop_api.Domain.Interfaces.Smtp;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Factories
{
    public class SmtpClientFactory : ISmtpClientFactory
    {
        private readonly IConfiguration _configuration;
        public SmtpClientFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SmtpClient CreateClient()
        {
            string server = _configuration["SMTP:Server"]!;
            int port = int.Parse(_configuration["SMTP:Port"]!);
            string username = _configuration["SMTP:Username"]!;
            string password = _configuration["SMTP:Password"]!;
            bool enableSsl = bool.Parse(_configuration["SMTP:EnableSsl"]!);

            return new SmtpClient(server, port)
            {
                Credentials = new System.Net.NetworkCredential(username, password),
                EnableSsl = enableSsl
            };
        }
    }
}
