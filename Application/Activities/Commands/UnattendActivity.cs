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
    public class UnattendActivity
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

                if (activity == null) ThrowRestExceptionForNotFoundActivity();

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUserName());

                var attendance = await _context.UserActivities
                    .SingleOrDefaultAsync(x => x.ActivityId == activity.Id &&
                        x.AppUserId == user.Id);

                if (attendance == null) return Unit.Value;

                CheckIfAttendanceIsHost(attendance);

                RemoveAttendanceFromDB(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private void ThrowRestExceptionForNotFoundActivity()
            {
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not Found"
                });
            }

            private void ThrowRestExceptionForAlreadyAttendingActivity()
            {
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    Attendance = "Already attending this activity"
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