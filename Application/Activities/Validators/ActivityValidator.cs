using Domain;
using FluentValidation;

namespace Application.Activities.Validators
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title must not be empty");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Decription must not be empty");
            RuleFor(x => x.Category).NotEmpty().WithMessage("Category must not be empty");
            RuleFor(x => x.Date).NotEmpty().WithMessage("Date must not be empty");
            RuleFor(x => x.City).NotEmpty().WithMessage("City must not be empty");
            RuleFor(x => x.Venue).NotEmpty().WithMessage("Venue must not be empty");
        }
    }
}