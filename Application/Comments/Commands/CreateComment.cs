using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Comments.Dto;
using Application.Common;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.Comments.Commands
{
    public class CreateComment
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class CommentHandler : Handler, IRequestHandler<Command, CommentDto>
        {
            private readonly IMapper _mapper;

            public CommentHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : base(context, userAccessor)
            {
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await GetActivityFromDB(request.ActivityId);

                var user = await GetUserFromDB(_userAccessor.GetCurrentUserName());

                var comment = CreateNewComment(user, activity, request);

                AddCommentToActivity(activity, comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem saving changes");
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