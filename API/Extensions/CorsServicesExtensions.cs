using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class CorsServicesExtension
    {
        public static IServiceCollection AddCorsServices(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000")
                    .WithOrigins("http://localhost:3001").AllowCredentials();
                });
            });

            return services;
        }
    }
}