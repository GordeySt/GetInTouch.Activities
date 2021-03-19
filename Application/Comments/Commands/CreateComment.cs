using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Comments.Dto;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Comments.Commands
{
    public class CreateComment
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                CheckIfActivityNotFound(activity);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);

                var comment = CreateNewComment(user, activity, request);

                AddCommentToActivity(activity, comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem saving changes");
            }

            private void CheckIfActivityNotFound(Activity activity)
            {
                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new
                {
                    Activity = "Not Found"
                });
            }

            private Comment CreateNewComment(AppUser user, Activity activity, Command request)
            {
                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                return comment;
            }

            private void AddCommentToActivity(Activity activity, Comment comment)
            {
                activity.Comments.Add(comment);
            }
        }
    }
}