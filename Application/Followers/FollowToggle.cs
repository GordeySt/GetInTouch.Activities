using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistance;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetName { get; set; }
        }

        public class FollowHandler : Handler, IRequestHandler<Command, Result<Unit>>
        {
            public FollowHandler(DataContext context, IUserAccessor userAccessor) : base(context, userAccessor)
            { }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await GetUserFromDB(_userAccessor.GetCurrentUserName());

                var target = await GetUserFromDB(request.TargetName);

                CheckIfTargetNotFound(target);

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

                CheckIfFollowingExists(following, observer, target);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to attend activity");
            }

            private void CheckIfTargetNotFound(AppUser target)
            {
                if (target == null) throw new RestException(HttpStatusCode.NotFound, new
                {
                    target = "Cannot find user to follow"
                });
            }

            private void CheckIfFollowingExists(UserFollowing following, AppUser observer, AppUser target)
            {
                if (following == null)
                {
                    following = CreateNewFollowing(observer, target);
                    _context.UserFollowings.Add(following);
                }
                else
                {
                    _context.UserFollowings.Remove(following);
                }
            }

            private UserFollowing CreateNewFollowing(AppUser observer, AppUser target)
            {
                var following = new UserFollowing
                {
                    Observer = observer,
                    Target = target
                };

                return following;
            }
        }
    }
}