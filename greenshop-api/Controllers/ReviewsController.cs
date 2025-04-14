using AutoMapper;
using greenshop_api.Authority;
using greenshop_api.Domain.Interfaces.Jwt;
using greenshop_api.Domain.Models;
using greenshop_api.Dtos.Reviews;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.Review_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Filters.ExceptionFilters.Review_ExceptionFilters;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IUserRepository repository;
        private readonly IJwtService jwtService;
        private readonly IMapper mapper;

        public ReviewsController(ApplicationDbContext db, IUserRepository repository, IJwtService jwtService, IMapper mapper)
        {
            this.db = db;
            this.repository = repository;
            this.jwtService = jwtService;
            this.mapper = mapper;
        }

        [HttpGet("{plantId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(Review_ValidateJwtTokenActionFilter))]
        public async Task<IActionResult> GetReviews(
             string plantId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            IQueryable<Review> reviewsQuery = db.Reviews.Where(r => r.PlantId == plantId);

            reviewsQuery = reviewsQuery.Skip((page - 1) * pageSize).Take(pageSize);

            var reviews = await reviewsQuery.ToListAsync();

            var userIds = reviews.Select(r => r.UserId).ToList();
            var users = await repository.GetUsersByIdsAsync(userIds!);

            var getReviewDtos = reviews.Select(review =>
            {
                var reviewDto = mapper.Map<GetReviewDto>(review);
                return reviewDto;
            }).ToList();

            if (getReviewDtos == null)
            {
                return Ok(new List<GetReviewDto>());
            }

            var jwt = Request.Cookies["jwt"];
            if (!string.IsNullOrEmpty(jwt))
            {
                var token = jwtService.Verify(jwt);
                var userId = token.Issuer.ToString();
                var currentUser = users.FirstOrDefault(u => u.UserId == userId);

                if (currentUser != null)
                {
                    var currentUserReview = getReviewDtos.FirstOrDefault(r => r.UserName == currentUser.UserName);

                    if (currentUserReview != null)
                    {
                        getReviewDtos.Remove(currentUserReview);
                    }
                }
            }
            
            return Ok(getReviewDtos);
        }

        [HttpGet("{plantId}/user")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        public async Task<IActionResult> GetReviewByUser([FromRoute]string plantId)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var review = await this.db.Reviews.FindAsync(userId, plantId);

            if(review != null)
            {
                var reviewDto = mapper.Map<GetReviewDto>(review);
                return Ok(reviewDto);
            }

            return NoContent();
        }

        [HttpGet("{plantId}/total-number")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> GetTotalNumberOfReviewsPerPlant([FromRoute]string plantId)
        {
            var count = await this.db.Reviews.CountAsync(r => r.PlantId == plantId);
            return Ok(count);
        }

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Review_ValidateReviewConflictActionFilter))]
        public async Task<IActionResult> CreateReview([FromBody]PostReviewDto review)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var reviewToCreate = mapper.Map<Review>(review);
            reviewToCreate.UserId = userId;

            this.db.Reviews.Add(reviewToCreate);
            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Review_ValidateReviewExistsActionFilter))]
        [TypeFilter(typeof(Review_ValidateUpdateReviewActionFilter))]
        [TypeFilter(typeof(Review_HandleUpdateExceptionFilter))]
        public async Task<IActionResult> UpdateReview([FromRoute]string plantId, [FromBody]PostReviewDto review)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var reviewToUpdate = await this.db.Reviews.FindAsync(userId, plantId);

            reviewToUpdate!.Rating = review.Rating;
            reviewToUpdate.Creation_Date = DateTime.Now;
            reviewToUpdate.Comment = review.Comment;

            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Review_ValidateReviewExistsActionFilter))]
        public async Task<IActionResult> DeleteReview([FromRoute]string plantId)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt!);
            var userId = token.Issuer.ToString();

            var reviewToDelete = await this.db.Reviews.FindAsync(userId, plantId);

            this.db.Reviews.Remove(reviewToDelete!);
            await this.db.SaveChangesAsync();

            return NoContent();
        }
    }
}
