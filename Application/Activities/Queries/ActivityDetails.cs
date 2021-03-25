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
using Application.Activities.Commands;

namespace Application.Activities
{
    public class ActivityDetails
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class ActivityHandler : Handler, IRequestHandler<Query, ActivityDto>
        {
            private readonly IMapper _mapper;

            public ActivityHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : base(context, userAccessor)
            {
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await GetActivityFromDB(request.Id);

                CheckIfActivityNotFound(activity);

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}