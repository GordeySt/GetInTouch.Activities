using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

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
                RuleFor(x => x.DisplayedName)
                    .NotEmpty().WithMessage("DisplayedName must not be empty");
                RuleFor(x => x.UserName)
                    .NotEmpty().WithMessage("Username must not be empty")
                    .MinimumLength(6).WithMessage("Username should be at least 6 characters");
                RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email must not be empty")
                    .EmailAddress().WithMessage("Invalid email address");
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
                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                }

                if (await _context.Users.AnyAsync(x => x.UserName == request.UserName))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "UserName already exists" });
                }

                var user = new AppUser
                {
                    DisplayedName = request.DisplayedName,
                    Email = request.Email,
                    UserName = request.UserName
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayedName = user.DisplayedName,
                        Token = _jwtGenerator.CreateToken(user),
                        UserName = user.UserName,
                        Image = null
                    };
                }

                throw new Exception("Problem creating user");
            }
        }
    }
}