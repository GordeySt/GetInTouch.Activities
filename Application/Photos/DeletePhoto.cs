using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photos
{
    public class DeletePhoto
    {
        public class Command : IRequest
        {
            public string ImageId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                _userAccessor.GetCurrentUserName());

                var photo = SearchPhoto(user, request);

                CheckIfPhotoExists(photo);
                CheckIfPhotoIsMain(photo);

                var result = DeletePhotoFromCloud(photo);

                CheckIfResultOfDeletionIsSuccess(result);

                DeletePhotoFromUserPhotoCollection(user, photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }

            private Photo SearchPhoto(AppUser user, Command request)
            {
                return user.Photos.FirstOrDefault(x => x.Id == request.ImageId);
            }

            private void CheckIfPhotoExists(Photo photo)
            {
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        Photo = "Not Found"
                    });
            }

            private void CheckIfPhotoIsMain(Photo photo)
            {
                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new
                    {
                        Photo = "You cannot delete your main photo"
                    });
            }

            private string DeletePhotoFromCloud(Photo photo)
            {
                return _photoAccessor.DeletePhoto(photo.Id);
            }

            private void CheckIfResultOfDeletionIsSuccess(string result)
            {
                if (result == null)
                    throw new Exception("Probles deleting the photo");
            }

            private void DeletePhotoFromUserPhotoCollection(AppUser user, Photo photo)
            {
                user.Photos.Remove(photo);
            }
        }
    }
}