using System.Net;
using System.Net.Mail;

namespace greenshop_api.Services
{
    public class NewsettlerService
    {
        private readonly IConfiguration _configuration;

        public NewsettlerService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendNewsettlerMessage(string recipient)
        {
            string server = _configuration["SMTP:Server"];
            string username = _configuration["SMTP:Username"];
            string password = _configuration["SMTP:Password"];
            int port = int.Parse(_configuration["SMTP:Port"]);   
            bool enableSsl = bool.Parse(_configuration["SMTP:EnableSsl"]);

            MailMessage message = new MailMessage(username, recipient)
            {
                Subject = "Get ready for new product in Miso Greenshop!",
                Body = "Test body"
            };

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
    }
}
