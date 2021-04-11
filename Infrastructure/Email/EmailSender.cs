using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
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
                await client.AuthenticateAsync("gordeystahovets@gmail.com", "FunMUKeane");
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}