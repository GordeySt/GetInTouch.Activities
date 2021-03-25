using System;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Common
{
    public class Handler
    {
        protected readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        protected void CheckIfActivityNotFound(Activity activity)
        {
            if (activity == null)
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not Found"
                });
        }

        protected async Task<AppUser> GetUserFromDB()
        {
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUserName());

            return user;
        }

        protected async Task<Activity> GetActivityFromDB(Guid ActivityId)
        {
            var activity = await _context.Activities.FindAsync(ActivityId);

            return activity;
        }

        protected async Task<UserActivity> GetAttendanceFromDB(Activity activity, AppUser user)
        {
            var attendance = await _context.UserActivities
                    .SingleOrDefaultAsync(x => x.ActivityId == activity.Id &&
                        x.AppUserId == user.Id);

            return attendance;
        }

        protected void CheckIfPhotoNotFound(Photo photo)
        {
            if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        Photo = "Not Found"
                    });
        }
    }
}