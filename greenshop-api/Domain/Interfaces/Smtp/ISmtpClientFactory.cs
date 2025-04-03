using System.Net.Mail;

namespace greenshop_api.Domain.Interfaces.Smtp
{
    public interface ISmtpClientFactory
    {
        SmtpClient CreateClient();
    }
}
