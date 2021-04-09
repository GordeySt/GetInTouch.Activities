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
using System.Linq;
using Application.Core;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayedName { get; set; }

            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
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

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, UserManager<AppUser> userManager,
            IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                await CheckIfEmailAlreadyExists(request);
                await CheckIfUserAlreadyExists(request);

                var user = CreateNewUser(request);

                var refreshToken = _jwtGenerator.GenerateRefreshToken();
                user.RefreshTokens.Add(refreshToken);

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User(user, _jwtGenerator, refreshToken.Token);
                }

                throw new Exception("Problem creating user");
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