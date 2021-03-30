using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Commands
{
    public class CancelActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class ActivityHandler : Handler, IRequestHandler<Command, Result<Unit>>
        {
            public ActivityHandler(DataContext context, IUserAccessor userAccessor) : base(context, userAccessor)
            { }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await GetActivityFromDB(request.Id);

                var user = await GetUserFromDB();

                var attendance = await GetAttendanceFromDB(activity, user);

                CheckIfItPossibleToCancelActivity(attendance, activity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to attend activity");
            }

            private void CheckIfItPossibleToCancelActivity(UserActivity attendance, Activity activity)
            {
                if (attendance != null && attendance.IsHost) 
                    activity.IsCancelled = !activity.IsCancelled;
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