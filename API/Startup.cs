using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistance;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using FluentValidation.AspNetCore;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options => 
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(ActivitiesList.Handler).Assembly);

            services.AddControllers().AddFluentValidation(config => {
                config.RegisterValidatorsFromAssemblyContaining<CreateActivity>();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
