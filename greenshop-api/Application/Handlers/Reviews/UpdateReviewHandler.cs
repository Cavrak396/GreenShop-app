using AutoMapper;
using greenshop_api.Application.Commands.Reviews;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using MediatR;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class UpdateReviewHandler(
        IReviewsRepository reviewsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : 
        IRequestHandler<UpdateReviewCommand, Unit>
    {
        private readonly IReviewsRepository _reviewsRepository = 
            reviewsRepository;
        private readonly IJwtService _jwtService = 
            jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = 
            httpContextAccessor;
        private readonly IMapper _mapper = 
            mapper;
        public async Task<Unit> Handle(
            UpdateReviewCommand request, 
            CancellationToken cancellationToken)
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
            var newReview = _mapper
                .Map<Review>(request.Review);

            await _reviewsRepository
                .UpdateReviewAsync(
                review!, 
                newReview);

            return Unit.Value;
        }
    }
}
