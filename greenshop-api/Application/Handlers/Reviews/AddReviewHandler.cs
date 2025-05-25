using AutoMapper;
using greenshop_api.Application.Commands.Reviews;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using MediatR;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class AddReviewHandler(
        IReviewsRepository reviewsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : 
        IRequestHandler<AddReviewCommand, Unit>
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
            AddReviewCommand request, 
            CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?
                .Request.Cookies["jwt"];
            var token = _jwtService
                .Verify(jwt!);
            var userId = token.Issuer
                .ToString();

            var review = _mapper
                .Map<Review>(request.Review);
            review.UserId = userId;

            await _reviewsRepository
                .AddReviewAsync(review);

            return Unit.Value;
        }
    }
}
