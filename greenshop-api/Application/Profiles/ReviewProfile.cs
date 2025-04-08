using AutoMapper;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos;

namespace greenshop_api.Application.Profiles
{
    public class ReviewProfile : Profile
    {
        public ReviewProfile()
        {
            CreateMap<Review, ReviewDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User != null ? src.User.UserName : null));

            CreateMap<ReviewDto, Review>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Plant, opt => opt.Ignore());
        }

    }
}
