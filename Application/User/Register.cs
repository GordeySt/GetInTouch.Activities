using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Application.Core;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest
        {
            public string DisplayedName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Origin { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayedName).DisplayedName();
                RuleFor(x => x.UserName).UserName();
                RuleFor(x => x.Email).Email();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IEmailSender _emailSender;

            public Handler(DataContext context, UserManager<AppUser> userManager, IEmailSender emailSender)
            {
                _emailSender = emailSender;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await CheckIfEmailAlreadyExists(request);
                await CheckIfUserAlreadyExists(request);

                var user = CreateNewUser(request);

                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded) throw new Exception("Problem creating user");

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                var verifyUrl = $"{request.Origin}/user/verifyEmail?token={token}&email={request.Email}";

                var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>{verifyUrl}></a></p>";

                await _emailSender.SendEmailAsync(request.Email, "Please verify email address", message);

                return Unit.Value;
            }

            private async Task CheckIfEmailAlreadyExists(Command request)
            {
                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                }
            }

            private async Task CheckIfUserAlreadyExists(Command request)
            {
                if (await _context.Users.AnyAsync(x => x.UserName == request.UserName))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "UserName already exists" });
                }
            }

            private AppUser CreateNewUser(Command request)
            {
                var user = new AppUser
                {
                    DisplayedName = request.DisplayedName,
                    Email = request.Email,
                    UserName = request.UserName
                };

                return user;
            }
        }
    }
}