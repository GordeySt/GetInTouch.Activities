using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Domain;
using Application.Interfaces;
using Application.Common;

namespace Application.Activities
{
    public class DeleteActivity
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

                RemoveActivityFromDB(activity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private void RemoveActivityFromDB(Activity activity)
            {
                _context.Remove(activity);
            }
        }
    }
}