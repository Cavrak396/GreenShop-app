using AutoMapper;
using greenshop_api.Application.Queries.Reviews;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Reviews;
using MediatR;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class GetReviewByPlantIdForUserHandler(
        IReviewsRepository reviewsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : 
        IRequestHandler<GetReviewByPlantIdForUserQuery, GetReviewDto?>
    {
        private readonly IReviewsRepository _reviewsRepository = 
            reviewsRepository;
        private readonly IJwtService _jwtService = 
            jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = 
            httpContextAccessor;
        private readonly IMapper _mapper = 
            mapper;

        public async Task<GetReviewDto?> Handle(GetReviewByPlantIdForUserQuery request, CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?
                .Request.Cookies["jwt"];
            var token = _jwtService
                .Verify(jwt!);
            var userId = token.Issuer
                .ToString();

            var review = await _reviewsRepository
                .GetReviewByIdsAsync(
                userId, 
                request.PlantId!);

            if (review != null)
            {
                return _mapper
                    .Map<GetReviewDto>(review);
            }

            return null;
        }
    }
}
