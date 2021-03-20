using Infrastructure.Security;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class AuthorizationServicesExtensions
    {
        public static IServiceCollection AddAuthorizationServices(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            return services;
        }
    }
}