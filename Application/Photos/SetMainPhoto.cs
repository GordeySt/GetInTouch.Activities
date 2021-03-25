using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistance;

namespace Application.Photos
{
    public class SetMainPhoto
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class PhotoHandler : Handler, IRequestHandler<Command>
        {

            public PhotoHandler(DataContext context, IUserAccessor userAccessor) 
                : base(context, userAccessor)
            { }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await GetUserFromDB();

                var photo = FindPhotoToSetAsMain(user, request);

                CheckIfPhotoNotFound(photo);

                var currentMainPhoto = FindCurrentMainPhoto(user); 

                SetNewMainPhoto(currentMainPhoto, photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private Photo FindPhotoToSetAsMain(AppUser user, Command request)
            {
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                return photo;
            }

            private Photo FindCurrentMainPhoto(AppUser user)
            {
                var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

                return currentMainPhoto;
            }

            private void SetNewMainPhoto(Photo currentMainPhoto, Photo photoToSet)
            {
                currentMainPhoto.IsMain = false;
                photoToSet.IsMain = true;
            }
        }
    }
}