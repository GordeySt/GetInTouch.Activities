using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.UserName, options => options.MapFrom(source => source.AppUser.UserName))
                .ForMember(d => d.DisplayedName, options => options.MapFrom(source => source.AppUser.DisplayedName))
                .ForMember(d => d.Image, options => options.MapFrom(source => source.AppUser.Photos.FirstOrDefault(x => 
                x.IsMain).Url));
        }
    }
}