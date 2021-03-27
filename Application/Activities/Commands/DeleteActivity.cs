using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Domain;
using Application.Interfaces;
using Application.Common;
using Application.Core;

namespace Application.Activities
{
    public class DeleteActivity
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

                RemoveActivityFromDB(activity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to delete activity");
            }

            private void RemoveActivityFromDB(Activity activity)
            {
                _context.Remove(activity);
            }
        }
    }
}