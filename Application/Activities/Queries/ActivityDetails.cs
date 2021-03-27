using System;
using Domain;
using MediatR;
using Persistance;
using System.Threading.Tasks;
using System.Threading;
using AutoMapper;
using Application.Interfaces;
using Application.Common;
using Application.Core;

namespace Application.Activities
{
    public class ActivityDetails
    {
        public class Query : IRequest<Result<ActivityDto>>
        {
            public Guid Id { get; set; }
        }

        public class ActivityHandler : Handler, IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly IMapper _mapper;

            public ActivityHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : base(context, userAccessor)
            {
                _mapper = mapper;
            }

            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await GetActivityFromDB(request.Id);

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return Result<ActivityDto>.Success(activityToReturn);
            }
        }
    }
}