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
    public class UnattendActivity
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

                CheckIfAttendanceNotFound(attendance);
                CheckIfAttendanceIsHost(attendance);

                RemoveAttendanceFromDB(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to create activity");
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