using greenshop_api.Domain.Interfaces.Modules;

namespace greenshop_api.Infrastructure.Services.Newsletter
{
    public class NewsletterContent : INewsletterContent
    {
        public string GenerateContent(string title, string body)
        {
            return $@"
            <html>
                <body style='font-family: Arial, sans-serif;'>
                    <h3 style='color: #46a358;'>{title}</h3>
                    <p>{body}</p>
                    <h4>Miso Greenshop Team</h4>
                </body>
            </html>";
        }
    }
}
