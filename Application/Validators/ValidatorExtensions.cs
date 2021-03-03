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
                .NotEmpty().WithMessage("{PropertyName} must not be empty")
                .Must(x => x.All(Char.IsLetter)).WithMessage("{PropertyName} should conatin only symbols")
                .Length(2, 50).WithMessage("{PropertyName} length should be 2-50 characters");

            return options;
        }

        public static IRuleBuilder<T, string> UserName<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} must not be empty")
                .Length(6, 50).WithMessage("{PropertyName} length should be 6-50 characters")
                .Must(BeAValidUsernameOrPassword).WithMessage("{PropertyName} must not contain spaces");

            return options;
        }

        public static IRuleBuilder<T, string> Email<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().WithMessage("{PropertyName} must not be empty")
                .EmailAddress().WithMessage("Invalid {PropertyName} address");

            return options;
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