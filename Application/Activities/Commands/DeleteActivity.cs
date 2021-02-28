using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Application.Errors;
using System.Net;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public Command(Guid id) => Id = id;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null) ThrowRestExceptionForNotFoundActivity();

                _context.Remove(activity);

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
        }
    }
}