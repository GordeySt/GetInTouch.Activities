using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.DisplayedName, o => o.MapFrom(s => s.Author.DisplayedName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x
                => x.IsMain).Url));
        }
    }
}