using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }
        
        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("", "gordeystahovets@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", userEmail));
            emailMessage.Subject = emailSubject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.AuthenticateAsync(_config["Authentication:Email:Login"], 
                _config["Authentication:Email:Password"]);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}