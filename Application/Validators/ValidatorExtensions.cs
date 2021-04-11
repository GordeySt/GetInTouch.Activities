using System;
using System.Linq;
using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
               .NotEmpty().WithMessage("Password must not be empty")
               .Length(6, 50).WithMessage("Password must be 6-50 characters")
               .Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter")
               .Matches("[a-z]").WithMessage("Password must have at least 1 lowercase character")
               .Matches("[0-9]").WithMessage("Password must contain a number")
               .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non-alphanumeric")
               .Must(BeAValidUsernameOrPassword).WithMessage("{PropertyName} must not contain spaces");

            return options;
        }

        public static IRuleBuilder<T, string> DisplayedName<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().WithMessage("DisplayedName must not be empty")
                .Length(2, 50).WithMessage("DisplayedName length should be 2-50 characters")
                .Must(BeAValidDisplayedName).WithMessage("{PropertyName} must contain only symbols");

            return options;
        }

        public static IRuleBuilder<T, string> UserName<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().WithMessage("UserName must not be empty")
                .Length(6, 50).WithMessage("UserName length should be 6-50 characters")
                .Must(BeAValidUsernameOrPassword).WithMessage("UserName must not contation spaces");

            return options;
        }

        public static IRuleBuilder<T, string> Email<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().WithMessage("Email must not be empty")
                .EmailAddress().WithMessage("Invalid Email address");

            return options;
        }

        private static bool BeAValidDisplayedName(string value)
        {
            if (value.All(c => Char.IsLetter(c) || c == ' '))
            {
                return true;
            }

            return false;
        }

        private static bool BeAValidUsernameOrPassword(string value)
        {
            if (value.IndexOf(' ') > -1)
            {
                return false;
            }

            return true;
        }
    }
}