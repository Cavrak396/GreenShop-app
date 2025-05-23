using AutoMapper;
using greenshop_api.Application.Queries.Reviews;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.Reviews;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class GetAllReviewsByPlantIdHandler(
        IReviewsRepository reviewsRepository,
        IUsersRepository usersRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : 
        IRequestHandler<GetAllReviewsByPlantIdQuery, List<GetReviewDto>>
    {
        private readonly IReviewsRepository _reviewsRepository = 
            reviewsRepository;
        private readonly IUsersRepository _usersRepository = 
            usersRepository;
        private readonly IJwtService _jwtService = 
            jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = 
            httpContextAccessor;
        private readonly IMapper _mapper = 
            mapper;

        public async Task<List<GetReviewDto>> Handle(
            GetAllReviewsByPlantIdQuery request, 
            CancellationToken cancellationToken)
        {
            var reviewsQuery = _reviewsRepository
                .GetAllReviewsQueryable(request.PlantId!);

            reviewsQuery = reviewsQuery
                .Skip((request.Page - 1) * 
                request.PageSize)
                .Take(request.PageSize);

            var reviews = await reviewsQuery
                .ToListAsync(cancellationToken: 
                cancellationToken);

            var userIds = reviews
                .Select(r => r.UserId)
                .ToList();
            var users = await _usersRepository
                .GetUsersByIdsAsync(userIds!);

            var getReviewDtos = _mapper
                .Map<List<GetReviewDto>>(reviews);

            if (getReviewDtos == null)
            {
                return [];
            }

            var jwt = _httpContextAccessor.HttpContext?
                .Request.Cookies["jwt"];
            if (!string.IsNullOrEmpty(jwt))
            {
                var token = _jwtService
                    .Verify(jwt);
                var userId = token.Issuer
                    .ToString();
                var currentUser = users
                    .FirstOrDefault(u => u.UserId == userId);

                if (currentUser != null)
                {
                    var currentUserReview = getReviewDtos
                        .FirstOrDefault(r => r.UserName == currentUser.UserName);

                    if (currentUserReview != null)
                    {
                        getReviewDtos
                            .Remove(currentUserReview);
                    }
                }
            }

            return getReviewDtos;
        }
    }
}
