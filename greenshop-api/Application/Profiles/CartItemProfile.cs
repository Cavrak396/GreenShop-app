using AutoMapper;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.CartItems;

namespace greenshop_api.Application.Profiles
{
    public class CartItemProfile : Profile
    {
        public CartItemProfile() 
        {
            CreateMap<CartItemDto, CartItem>()
                .ForMember(dest => dest.CartId, opt => opt
                .MapFrom((src, dest, destMember, context) =>
                context.Items["CartId"]));

            CreateMap<CartItem, CartItemDto>(); 
        }
    }
}
