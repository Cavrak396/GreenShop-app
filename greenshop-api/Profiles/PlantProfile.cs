using AutoMapper;
using greenshop_api.Dtos;
using greenshop_api.Models;

namespace greenshop_api.Profiles
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
