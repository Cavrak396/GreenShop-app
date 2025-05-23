using AutoMapper;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Reviews;

namespace greenshop_api.Application.Profiles
{
    public class ReviewProfile : Profile
    {
        public ReviewProfile()
        {
            CreateMap<Review, GetReviewDto>()
            .ForMember(dest => dest.UserName, opt => opt
            .MapFrom(src => src.User != null ? 
            src.User.UserName : 
            null));

            CreateMap<PostReviewDto, Review>()
                .ForMember(dest => dest.Creation_Date, opt => opt
                .MapFrom(src => DateTime.Now));
        }

    }
}
