using greenshop_api.Application.Commands.Reviews;
using greenshop_api.Application.Queries.Reviews;
using greenshop_api.Dtos.Reviews;
using greenshop_api.Filters.ActionFilters.General;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ActionFilters.Review_ActionFilters;
using greenshop_api.Filters.ActionFilters.User_ActionFilters;
using greenshop_api.Filters.ExceptionFilters.Review_ExceptionFilters;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class ReviewsController(IMediator mediator) : 
        ControllerBase
    {
        private readonly IMediator _mediator = 
            mediator;

        [HttpGet("{plantId}")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(Review_ValidateJwtTokenActionFilter))]
        public async Task<IActionResult> GetReviews(
             string plantId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var getReviewDtos = await _mediator.Send(
            new GetAllReviewsByPlantIdQuery
            {
                PlantId = plantId,
                Page = page,
                PageSize = pageSize
            });
            
            return Ok(getReviewDtos);
        }

        [HttpGet("{plantId}/user")]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        public async Task<IActionResult> GetReviewByUser([FromRoute]string plantId)
        {
            var getReviewDto = await _mediator.Send(
            new GetReviewByPlantIdForUserQuery
            {
                PlantId = plantId
            });

            if(getReviewDto != null)
            {
                return Ok(getReviewDto);
            }

            return NoContent();
        }

        [HttpGet("{plantId}/total-number")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> GetTotalNumberOfReviewsPerPlant([FromRoute]string plantId)
        {
            var count = await _mediator.Send(
            new GetTotalNumberOfReviewsByPlantIdQuery
            {
                PlantId = plantId
            });

            return Ok(count);
        }

        [HttpGet("{plantId}/rating-number")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<ActionResult<Dictionary<int, int>>> GetNumberOfReviewsByRatingsPerPlant([FromRoute]string plantId)
        {
            var ratingCounts = await _mediator.Send(
            new GetNumberOfReviewsByRatingsQuery
            {
                PlantId = plantId
            });

            return Ok(ratingCounts);
        }

        [HttpPost]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("SlidingWindowIpAddressRestrictLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Review_ValidateCreateReviewActionFilter))]
        public async Task<IActionResult> CreateReview([FromBody]PostReviewDto review)
        {
            await _mediator.Send(
            new AddReviewCommand
            {
                Review = review
            });

            return NoContent();
        }

        [HttpPut("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("SlidingWindowIpAddressRestrictLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Review_ValidateReviewExistsActionFilter))]
        [TypeFilter(typeof(Review_ValidateUpdateReviewActionFilter))]
        [TypeFilter(typeof(Review_HandleUpdateExceptionFilter))]
        public async Task<IActionResult> UpdateReview(
            [FromRoute]string plantId, 
            [FromBody]PostReviewDto review)
        {
            await _mediator.Send(
            new UpdateReviewCommand
            {
                PlantId = plantId,
                Review = review
            });

            return NoContent();
        }

        [HttpDelete("{plantId}")]
        [EnableCors("WithCredentialsPolicy")]
        [EnableRateLimiting("SlidingWindowIpAddressRestrictLimiter")]
        [TypeFilter(typeof(ValidateApplicationKeyActionFilter))]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(User_ValidateJwtTokenActionFilter))]
        [TypeFilter(typeof(Review_ValidateReviewExistsActionFilter))]
        public async Task<IActionResult> DeleteReview([FromRoute]string plantId)
        {
            await _mediator.Send(new DeleteReviewCommand 
            { 
                PlantId = plantId 
            });

            return NoContent();
        }
    }
}
