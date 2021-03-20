using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Domain;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity.Title).NotEmpty();
                RuleFor(x => x.Activity.Description).NotEmpty();
                RuleFor(x => x.Activity.Category).NotEmpty();
                RuleFor(x => x.Activity.Date).NotEmpty();
                RuleFor(x => x.Activity.City).NotEmpty();
                RuleFor(x => x.Activity.Venue).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                AddNewActivityToDatabase(request.Activity);

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUserName());

                var attendee = CreateNewAttendee(user, request.Activity);

                AddNewAttendeeToDatabase(attendee);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
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