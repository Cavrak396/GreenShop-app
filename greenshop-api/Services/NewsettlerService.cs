using System.Net;
using System.Net.Mail;

namespace greenshop_api.Services
{
    public class NewsettlerService
    {
        private readonly IConfiguration configuration;

        public NewsettlerService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task SendNewsettlerMessage(string recipient, string subject, string title, string body)
        {
            string server = configuration["SMTP:Server"];
            string username = configuration["SMTP:Username"];
            string password = configuration["SMTP:Password"];
            int port = int.Parse(configuration["SMTP:Port"]);
            bool enableSsl = bool.Parse(configuration["SMTP:EnableSsl"]);

            string logoPath = Path.Combine(Directory.GetCurrentDirectory(), "..\\greenshop-api\\Media\\logo.png");

            MailMessage message = CreateNewsettlerMessage(username,
                recipient,
                subject,
                title,
                body
                );

            using SmtpClient client = new SmtpClient(server, port)
            {
                Credentials = new System.Net.NetworkCredential(username, password),
                EnableSsl = enableSsl
            };

            try
            {
                await client.SendMailAsync(message);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }

        private MailMessage CreateNewsettlerMessage(string username,
            string recipient,
            string subject,
            string title,
            string body)
        {
            string content = $@"
                 <html>
                     <body style='font-family: Arial, sans-serif;'>
                         <h3 style='color: #46a358;'>{title}</h3>
                         <p>{body}</p>
                         <h4>Miso Greenshop Team</h4>
                     </body>
                 </html>";

            var message = new MailMessage(username, recipient)
            {
                Subject = subject,
                IsBodyHtml = true,
                Body = content
            };

            return message;
        }
    }
}
