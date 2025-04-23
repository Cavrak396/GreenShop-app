using AutoMapper;
using AutoMapper.QueryableExtensions;
using greenshop_api.Application.Models;
using greenshop_api.Application.Queries.Plants;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Plants;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static greenshop_api.Domain.Models.Enums.SizeEnum;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetAllPlantsHandler(
        IPlantsRepository plantsRepository,
        IMapper mapper) : IRequestHandler<GetAllPlantsQuery, GetPlantsResponse>
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IMapper _mapper = mapper;  

        public async Task<GetPlantsResponse> Handle(GetAllPlantsQuery request, CancellationToken cancellationToken)
        {
            var plantsQuery = _plantsRepository.GetAllPlantsQueryable();

            if (!string.IsNullOrEmpty(request.Group))
            {
                if (string.Equals(request.Group, "new", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.OrderByDescending(p => p.Acquisition_Date).Take(9);
                }
                else if (string.Equals(request.Group, "sale", StringComparison.OrdinalIgnoreCase))
                {
                    if (request.Authorized)
                    {
                        plantsQuery = plantsQuery.Where(p => p.Sale_Percent_Private > 0);
                    }
                    else
                    {
                        plantsQuery = plantsQuery.Where(p => p.Sale_Percent > 0);
                    }
                }
            }

            if (!string.IsNullOrEmpty(request.Key))
            {
                plantsQuery = plantsQuery.Where(p => p.Name != null && p.Name.Contains(request.Key));
            }

            if (!string.IsNullOrEmpty(request.Category))
            {
                plantsQuery = plantsQuery.Where(p => p.Category!.ToLower() == request.Category.ToLower());
            }

            if (!string.IsNullOrEmpty(request.Size))
            {
                if (string.Equals(request.Size, "small", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Size == Size.S);
                }
                else if (string.Equals(request.Size, "medium", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Size == Size.M);
                }
                else if (string.Equals(request.Size, "large", StringComparison.OrdinalIgnoreCase))
                {
                    plantsQuery = plantsQuery.Where(p => p.Size == Size.L || p.Size == Size.XL);
                }
            }

            if (request.PriceMin != null)
            {
                plantsQuery = plantsQuery.Where(p => p.Price >= request.PriceMin);
            }

            if (request.PriceMax != null)
            {
                plantsQuery = plantsQuery.Where(p => p.Price <= request.PriceMax);
            }

            var totalNumber = await plantsQuery.CountAsync(cancellationToken);

            plantsQuery = plantsQuery.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize);

            var plants = await plantsQuery
                .ProjectTo<GetPlantDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);

            return new GetPlantsResponse
            {
                Plants = plants,
                TotalNumber = totalNumber,
            };
        }
    }
}
