using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
            .HasData(
                new Value { Id = 1, Name = "Value1" },
                new Value { Id = 2, Name = "Value2" },
                new Value { Id = 3, Name = "Value3" }
            );

            builder.Entity<UserActivity>(x => x.HasKey(ua =>
                new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(a => a.Activity)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(a => a.ActivityId);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(a => new { a.ObserverId, a.TargetId });

                b.HasOne(k => k.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(a => a.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(k => k.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(a => a.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
