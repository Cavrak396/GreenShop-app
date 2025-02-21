using AutoMapper;
using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Dtos;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.Review_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Filters.ExceptionFilters.Review_ExceptionFilters;
using greenshop_api.Models;
using greenshop_api.Services;
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
        private readonly JwtService jwtService;
        private readonly IMapper mapper;

        public ReviewsController(ApplicationDbContext db, IUserRepository repository, JwtService jwtService, IMapper mapper)
        {
            this.db = db;
            this.repository = repository;
            this.jwtService = jwtService;
            this.mapper = mapper;
        }

        [HttpGet("{plantId}")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateJwtTokenFilterAttribute))]
        public async Task<IActionResult> GetReviews(
             string plantId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            IQueryable<Review> reviewsQuery = db.Reviews.Where(r => r.PlantId == plantId);

            reviewsQuery = reviewsQuery.Skip((page - 1) * pageSize).Take(pageSize);

            var reviews = await reviewsQuery.ToListAsync();

            var userIds = reviews.Select(r => r.UserId).ToList();
            var users = await repository.GetUsersByIdsAsync(userIds);

            var reviewDtos = reviews.Select(review =>
            {
                var reviewDto = mapper.Map<ReviewDto>(review);
                reviewDto.UserName = users.FirstOrDefault(u => u.UserId == review.UserId)?.UserName;
                return reviewDto;
            }).ToList();

            if (reviewDtos == null)
            {
                return Ok(new List<ReviewDto>());
            }

            var jwt = Request.Cookies["jwt"];
            if (!string.IsNullOrEmpty(jwt))
            {
                var token = jwtService.Verify(jwt);
                var userId = token.Issuer.ToString();
                var currentUser = users.FirstOrDefault(u => u.UserId == userId);

                if (currentUser != null)
                {
                    var currentUserReview = reviewDtos.FirstOrDefault(r => r.UserName == currentUser.UserName);

                    if (currentUserReview != null)
                    {
                        reviewDtos.Remove(currentUserReview);
                    }
                }
            }
            
            return Ok(reviewDtos);
        }

        [HttpGet("{plantId}/user")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateReviewExistsFilterAttribute))]
        public async Task<IActionResult> GetReviewByUser(string plantId)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();
            var user = await this.repository.GetUserByIdAsync(userId);

            var review = await this.db.Reviews.FindAsync(userId, plantId);

            if(review != null)
            {
                var reviewDto = mapper.Map<ReviewDto>(review);
                reviewDto.UserName = user.UserName;
                return Ok(reviewDto);
            }

            return NoContent();
        }
        

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateCreateReviewFilterAttribute))]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto review)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();
            var user = await repository.GetUserByIdAsync(userId);

            review.UserName = user.UserName;
            review.Creation_Date = DateTime.Now;

            var reviewToCreate = mapper.Map<Review>(review);
            reviewToCreate.UserId = userId;

            this.db.Reviews.Add(reviewToCreate);
            await this.db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReviewByUser), new { 
                userId = reviewToCreate.UserId, 
                plantId = reviewToCreate.PlantId },
                review);
        }

        [HttpPut("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateReviewExistsFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateUpdateReviewFilterAttribute))]
        [TypeFilter(typeof(Review_HandleUpdateExceptionFilterAttribute))]
        public async Task<IActionResult> UpdateReview(string plantId, [FromBody] ReviewDto review)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();

            var reviewToUpdate = await this.db.Reviews.FindAsync(userId, plantId);

            reviewToUpdate.Rating = review.Rating;
            reviewToUpdate.Creation_Date = DateTime.Now;
            reviewToUpdate.Comment = review.Comment;

            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [TypeFilter(typeof(Plant_ValidatePlantIdFilterAttribute))]
        [TypeFilter(typeof(User_ValidateJwtTokenFilterAttribute))]
        [TypeFilter(typeof(Review_ValidateReviewExistsFilterAttribute))]
        public async Task<IActionResult> DeleteReview(string plantId)
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            var userId = token.Issuer.ToString();
            var user = await this.repository.GetUserByIdAsync(userId);

            var reviewToDelete = await this.db.Reviews.FindAsync(userId, plantId);

            this.db.Reviews.Remove(reviewToDelete);
            await this.db.SaveChangesAsync();

            return NoContent();
        }
    }
}
