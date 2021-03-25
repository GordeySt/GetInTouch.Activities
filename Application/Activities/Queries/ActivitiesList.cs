using MediatR;
using System.Collections.Generic;
using Domain;
using System.Threading;
using System.Threading.Tasks;
using Persistance;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Application.Interfaces;
using Application.Common;

namespace Application.Activities
{
    public class ActivitiesList
    {
        public class Query : IRequest<List<ActivityDto>> {}

        public class ActivityHandler : Handler, IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly IMapper _mapper;

            public ActivityHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : base(context, userAccessor)
            {
                _mapper = mapper;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ToListAsync();

                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}