using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photos
{
    public class AddPhoto
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = AddPhotoToCloud(request);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var photo = CreateNewPhoto(photoUploadResult);

                CheckIfUserHasMainPhoto(user, photo);

                AddPhotoToUserCollectionOfPhoto(user, photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return photo;

                throw new Exception("Problem saving changes");
            }

            private PhotoUploadResult AddPhotoToCloud(Command request)
            {
                return _photoAccessor.AddPhoto(request.File);
            }

            private Photo CreateNewPhoto(PhotoUploadResult photoUploadResult)
            {
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.publicId
                };

                return photo;
            }

            private void CheckIfUserHasMainPhoto(AppUser user, Photo photo)
            {
                if (!user.Photos.Any(x => x.IsMain))
                    SetPhotoAsMain(photo);
            }

            private void SetPhotoAsMain(Photo photo)
            {
                photo.IsMain = true;
            }

            private void AddPhotoToUserCollectionOfPhoto(AppUser user, Photo photo)
            {
                user.Photos.Add(photo);
            }
        }
    }
}