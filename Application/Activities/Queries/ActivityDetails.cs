using System;
using Domain;
using MediatR;
using Persistance;
using System.Threading.Tasks;
using System.Threading;
using Application.Errors;
using System.Net;
using AutoMapper;
using Application.Interfaces;

namespace Application.Activities
{
    public class ActivityDetails
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IChecker _checker;

            public Handler(DataContext context, IMapper mapper, IChecker checker)
            {
                _checker = checker;
                _mapper = mapper;
                _context = context;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .FindAsync(request.Id);

                _checker.checkIfActivityNotFound(activity);

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}