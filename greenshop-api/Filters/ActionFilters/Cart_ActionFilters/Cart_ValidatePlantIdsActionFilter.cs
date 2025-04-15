using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Dtos.CartItems;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Cart_ActionFilters
{
    public class Cart_ValidatePlantIdsActionFilter(
        IPlantsRepository plantsRepository, 
        IActionErrorCreator actionErrorCreator) : IAsyncActionFilter
    {
        private readonly IPlantsRepository _plantsRepository = plantsRepository;
        private readonly IActionErrorCreator _actionErrorCreator = actionErrorCreator;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cartItems = context.ActionArguments["cartItems"] as List<CartItemDto>;

            foreach(var cartItem in cartItems!)
            {
                var plant = await _plantsRepository.GetPlantByIdAsync(cartItem.PlantId!);
                if(plant == null)
                {
                    _actionErrorCreator.CreateActionError(
                     context,
                     "Cart",
                     "One or more Plants in Cart does not exist.",
                     404,
                     problemDetails => new NotFoundObjectResult(problemDetails));
                    return;
                }
            }

            await next();
        }
    }
}
