using AutoMapper;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos;

namespace greenshop_api.Application.Profiles
{
    public class PlantProfile : Profile
    {
        public PlantProfile()
        {
            CreateMap<Plant, PlantDto>();
            CreateMap<PlantDto, Plant>();
        }
    }
}
