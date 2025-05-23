using AutoMapper;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Carts;

namespace greenshop_api.Application.Profiles
{
    public class CartProfile : Profile
    {
        public CartProfile()
        {
            CreateMap<Cart, CartDto>()
                .ForMember(dest => dest.CartItems, opt => opt
                .MapFrom(src => src.CartItems));
        }
    }
}
