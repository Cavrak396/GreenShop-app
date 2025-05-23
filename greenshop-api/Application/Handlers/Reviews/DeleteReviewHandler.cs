using greenshop_api.Application.Commands.Reviews;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Interfaces.Repositories;
using MediatR;

namespace greenshop_api.Application.Handlers.Reviews
{
    public class DeleteReviewHandler(
        IReviewsRepository reviewsRepository,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor) : 
        IRequestHandler<DeleteReviewCommand, Unit>
    {
        private readonly IReviewsRepository _reviewsRepository = 
            reviewsRepository;
        private readonly IJwtService _jwtService = 
            jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = 
            httpContextAccessor;
        public async Task<Unit> Handle(
            DeleteReviewCommand request, 
            CancellationToken cancellationToken)
        {
            var jwt = _httpContextAccessor.HttpContext?
                .Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var review = await _reviewsRepository
                .GetReviewByIdsAsync(
                userId, 
                request.PlantId!);
            await _reviewsRepository
                .DeleteReviewAsync(review!);

            return Unit.Value;
        }
    }
}
