using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities.Commands
{
    public class UnattendActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class ActivityHandler : Handler, IRequestHandler<Command>
        {
            public ActivityHandler(DataContext context, IUserAccessor userAccessor) : base(context, userAccessor)
            { }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await GetActivityFromDB(request.Id);

                CheckIfActivityNotFound(activity);

                var user = await GetUserFromDB();

                var attendance = await GetAttendanceFromDB(activity, user);

                CheckIfAttendaceNotFound(attendance);

                CheckIfAttendanceIsHost(attendance);

                RemoveAttendanceFromDB(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private void CheckIfAttendaceNotFound(UserActivity attendance)
            {
                if (attendance == null) throw new RestException(HttpStatusCode.NotFound, new
                {
                    attendance = "Not Found"
                });
            }

            private void CheckIfAttendanceIsHost(UserActivity attendance)
            {
                if (attendance.IsHost) ThrowRestExceptionForAttendaceHost();
            }

            private void ThrowRestExceptionForAttendaceHost()
            {
                throw new RestException(HttpStatusCode.BadRequest, new
                {
                    Attendance = "You cannot remove yourself as a host"
                });
            }

            private void RemoveAttendanceFromDB(UserActivity attendance)
            {
                _context.UserActivities.Remove(attendance);
            }
        }
    }
}