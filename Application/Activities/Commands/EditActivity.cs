using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using FluentValidation;
using Domain;
using Application.Interfaces;
using Application.Common;
using Application.Activities.Validators;
using Application.Core;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class ActivityHandler : Handler, IRequestHandler<Command, Result<Unit>>
        {
            public ActivityHandler(DataContext context, IUserAccessor userAccessor) : base(context, userAccessor)
            { }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await GetActivityFromDB(request.Activity.Id);

                ChangeActivityData(activity, request);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to edit activity");
            }

            private void ChangeActivityData(Activity activity, Command request)
            {
                activity.Title = request.Activity.Title ?? activity.Title;
                activity.Description = request.Activity.Description ?? activity.Description;
                activity.Category = request.Activity.Category ?? activity.Category;
                activity.Date = request.Activity.Date ?? activity.Date;
                activity.City = request.Activity.City ?? activity.City;
                activity.Venue = request.Activity.Venue ?? activity.Venue;
            }
        }
    }
}