using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayedName { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}