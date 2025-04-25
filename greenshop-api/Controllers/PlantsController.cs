using greenshop_api.Application.Commands.Plants;
using greenshop_api.Application.Models;
using greenshop_api.Application.Queries.Plants;
using greenshop_api.Application.Queries.Subscribers;
using greenshop_api.Domain.Interfaces.Service;
using greenshop_api.Dtos.Plants;
using greenshop_api.Filters.ActionFilters.Plant_ActionFilters;
using greenshop_api.Filters.ExceptionFilters.Plant_ExceptionFilters;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class PlantsController(
        INewsletterService newsletterService, 
        IMediator mediator) : ControllerBase
    {
        private readonly INewsletterService _newsletterService = newsletterService;
        private readonly IMediator _mediator = mediator;

        [HttpGet]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(Plant_ValidateGetHeadersActionFilter))]
        public async Task<IActionResult> GetPlants(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 9,
            [FromHeader(Name = "Authorized")] bool authorized = false,
            [FromHeader(Name = "SearchValue")] string? key = null,
            [FromHeader(Name = "CategoryValue")] string? category = null,
            [FromHeader(Name = "SizeType")] string? size = null,
            [FromHeader(Name = "Group")] string? group = null,
            [FromHeader(Name = "PriceMin")] double? priceMin = null,
            [FromHeader(Name = "PriceMax")] double? priceMax = null)
        {
            var getPlantsResponse = await _mediator.Send(new GetAllPlantsQuery
            {
                Page = page,
                PageSize = pageSize,
                Authorized = authorized,
                Key = key,
                Category = category,
                Size = size,
                Group = group,
                PriceMin = priceMin,
                PriceMax = priceMax
            });

            return Ok(getPlantsResponse);
        }

        [HttpGet("total-number")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        public async Task<IActionResult> GetTotalNumberOfPlants()
        {
            var count = await _mediator.Send(new GetTotalNumberOfPlantsQuery());
            return Ok(count);
        }

        [HttpGet("category-number")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(Plant_ValidateGetPlantNumberActionFilter))]
        public async Task<ActionResult<Dictionary<string, int>>> GetNumberOfPlantsByCategory([FromQuery]List<string> categories)
        {
            var categoryCounts = await _mediator.Send(new GetNumberOfPlantsByCategoriesQuery
            {
                Categories = categories
            });
            return Ok(categoryCounts);
        }

        [HttpGet("size-number")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        public async Task<ActionResult<Dictionary<string, int>>> GetNumberOfPlantsBySize()
        {
            var sizeCounts = await _mediator.Send(new GetNumberOfPlantsBySizesQuery());

            return Ok(sizeCounts);
        }

        [HttpGet("{plantId}")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> GetPlantById(string plantId)
        {
            var getPlantDto = await _mediator.Send(new GetPlantByIdQuery
            {
                Id = plantId
            });

            return Ok(getPlantDto);
        }

        [HttpGet("{plantId}/related")]
        [EnableRateLimiting("SlidingWindowIpAddressLimiter")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task<IActionResult> GetRelatedPlants([FromRoute]string plantId, [FromQuery]int relatedPlantsCount = 5)
        {
            var relatedPlants = await _mediator.Send(new GetRelatedPlantsQuery
            {
                Id = plantId,
                Count = relatedPlantsCount
            });

            return Ok(relatedPlants);
        }

        [HttpPost]
        [EnableRateLimiting("ConcurrencyIpAddressLimiter")]
        [TypeFilter(typeof(Plant_ValidateCreatePlantActionFilter))]
        public async Task<IActionResult> CreatePlant([FromBody]PostPlantDto plant)
        {
            var plantToCreate = await _mediator.Send(new AddPlantCommand
            {
                Plant = plant
            });

            var subscribers = await _mediator.Send(new GetAllSubscribersQuery());

            if (subscribers.Count != 0) 
            {
                foreach (var subscriber in subscribers)
                {
                    await _newsletterService.SendNewsletterAsync(
                        "newPlant",
                        new NewsletterHeader
                        {
                            Recipient = subscriber.SubscriberEmail,
                            Details = plantToCreate.Name
                        }
                    );
                }
            }

            return NoContent();
        }

        [HttpPut("{plantId}")]
        [EnableRateLimiting("SlidingWindowIpAddressRestrictLimiter")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        [TypeFilter(typeof(Plant_ValidateUpdatePlantActionFilter))]
        [TypeFilter(typeof(Plant_HandleUpdateExceptionFilter))]
        public async Task <IActionResult> UpdatePlant([FromRoute]string plantId, [FromBody]PostPlantDto plant)
        {
            await _mediator.Send(new UpdatePlantCommand
            {
                Id = plantId,
                Plant = plant
            });

            return NoContent();
        }

        [HttpDelete("{plantId}")]
        [EnableRateLimiting("SlidingWindowIpAddressRestrictLimiter")]
        [TypeFilter(typeof(Plant_ValidatePlantIdActionFilter))]
        public async Task <IActionResult> DeletePlant([FromRoute]string plantId)
        {
            await _mediator.Send(new DeletePlantCommand
            {
                Id = plantId
            });

            return NoContent();
        }
    }
}
