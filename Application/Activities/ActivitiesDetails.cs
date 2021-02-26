using System;
using Domain;
using MediatR;
using Persistance;
using System.Threading.Tasks;
using System.Threading;
using Application.Errors;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class ActivitiesDetails
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }

            public Query(Guid id) => Id = id;
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(x => x.UserActivities)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new {
                    activity = "Not Found"
                });

                return activity;
            }
        }
    }
}