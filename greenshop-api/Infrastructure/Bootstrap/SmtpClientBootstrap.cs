using greenshop_api.Application.Models;
using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace greenshop_api.Infrastructure.Bootstrap
{
    public static class SmtpClientBootstrap
    {
        public static IServiceCollection AddSmtpClient(
            this IServiceCollection services)
        {
            services.AddScoped(sp =>
            {
                var _smtpOptions = sp
                .GetRequiredService<IOptions<SmtpOptions>>().Value;

                return new SmtpClient(
                    _smtpOptions.Server, 
                    _smtpOptions.Port)
                {
                    Credentials = new System.Net.NetworkCredential(
                        _smtpOptions.Username, _smtpOptions.Password),
                    EnableSsl = _smtpOptions.EnableSsl,
                };
            });

            return services;
        }
    }
}
