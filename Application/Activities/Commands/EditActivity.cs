using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using FluentValidation;
using Application.Errors;
using System.Net;
using Domain;

namespace Application.Activities
{
    public class EditActivity
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

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                CheckIfActivityNotFound(activity);

                ChangeActivityData(activity, request);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private void CheckIfActivityNotFound(Activity activity)
            {
                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not Found"
                    });
            }

            private void ChangeActivityData(Activity activity, Command request)
            {
                activity.Title = request.Activity.Title ?? activity.Title;
                activity.Description = request.Activity.Description ?? activity.Description;
                activity.Category = request.Activity.Category ?? activity.Category;
                activity.Date = request.Activity.Date ?? activity.Date;
                activity.City = request.Activity.City ?? activity.City;
                activity.Venue = request.Activity.Venue ?? activity.Venue;
            }
        }
    }
}