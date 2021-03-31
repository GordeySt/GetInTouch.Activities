using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Domain;
using FluentValidation;
using Application.Interfaces;
using Application.Common;
using Application.Activities.Validators;
using Application.Core;

namespace Application.Activities
{
    public class CreateActivity
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
                AddNewActivityToDatabase(request.Activity);

                var user = await GetUserFromDB(_userAccessor.GetCurrentUserName());

                var attendee = CreateNewAttendee(user, request.Activity);

                AddNewAttendeeToDatabase(attendee);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to create activity");
            }

            private void AddNewActivityToDatabase(Activity activity)
            {
                _context.Activities.Add(activity);
            }

            private UserActivity CreateNewAttendee(AppUser user, Activity activity)
            {
                var attendee = new UserActivity
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true,
                    DateToJoined = DateTime.Now
                };

                return attendee;
            }

            private void AddNewAttendeeToDatabase(UserActivity attendee)
            {
                _context.UserActivities.Add(attendee);
            }
        }
    }
}