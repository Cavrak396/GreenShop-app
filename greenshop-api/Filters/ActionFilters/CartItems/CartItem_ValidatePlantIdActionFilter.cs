using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.CartItems;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.CartItems_ActionFilters
{
    public class CartItem_ValidatePlantIdActionFilter(
        IPlantsRepository plantsRepository,
        IActionErrorCreator acrionErrorCreator) : IAsyncActionFilter
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IActionErrorCreator _actionErrorCreator = acrionErrorCreator;
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cartItem = context.ActionArguments["cartItem"] as CartItemDto;
            var plant = _plantsRepository.GetPlantByIdAsync(cartItem!.PlantId!);

            if(plant == null)
            {
                _actionErrorCreator.CreateActionError(
                    context,
                    "Plant",
                    "Plant does not exist.",
                    404,
                    problemDetails => new NotFoundObjectResult(problemDetails));
                return;
            }
            await next();
        }
    }
}
