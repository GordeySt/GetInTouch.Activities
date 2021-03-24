using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities.Commands
{
    public class AttendActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                CheckIfActivityNotFound(activity);

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUserName());

                var attendance = await _context.UserActivities
                    .SingleOrDefaultAsync(x => x.ActivityId == activity.Id &&
                        x.AppUserId == user.Id);

                CheckIfAttendanceExists(attendance);

                attendance = CreateNewAttendance(activity, user);

                AddNewAttendanceToDB(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private void CheckIfAttendanceExists(UserActivity attendance)
            {
                if (attendance != null) throw new RestException(HttpStatusCode.NotFound, new
                    {
                        Attendance = "Already attending this activity"
                    });
            }

            private void CheckIfActivityNotFound(Activity activity)
            {
                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not Found"
                    });
            }

            private UserActivity CreateNewAttendance(Activity activity, AppUser user)
            {
                var attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    IsHost = false,
                    DateToJoined = DateTime.Now
                };

                return attendance;
            }

            private void AddNewAttendanceToDB(UserActivity attendance)
            {
                _context.UserActivities.Add(attendance);
            }
        }
    }
}