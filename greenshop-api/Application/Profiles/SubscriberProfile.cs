using AutoMapper;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Subscribers;
using greenshop_api.Dtos.Users;

namespace greenshop_api.Application.Profiles
{
    public class SubscriberProfile : Profile
    {
        public SubscriberProfile()
        {
            CreateMap<Subscriber, SubscriberDto>();

            CreateMap<SubscriberDto, Subscriber>()
                .ForMember(dest => dest.SubscriberId, opt => opt
                .MapFrom(src => Guid.NewGuid()
                .ToString()));

            CreateMap<User, Subscriber>()
                .ForMember(dest => dest.SubscriberId, opt => opt
                .MapFrom(src => Guid.NewGuid()
                .ToString()))
                .ForMember(dest => dest.SubscriberEmail, opt => opt
                .MapFrom(src => src.UserEmail));

            CreateMap<RegisterDto, Subscriber>()
                .ForMember(dest => dest.SubscriberId, opt => opt
                .MapFrom(src => Guid.NewGuid()
                .ToString()))
                .ForMember(dest => dest.SubscriberEmail, opt => opt
                .MapFrom(src => src.Email));
        }
    }
}
