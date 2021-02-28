using System;
using Domain;
using MediatR;
using Persistance;
using System.Threading.Tasks;
using System.Threading;
using Application.Errors;
using System.Net;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class ActivitiesDetails
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }

            public Query(Guid id) => Id = id;
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .FindAsync(request.Id);

                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not Found"
                });

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}