using greenshop_api.Domain.Interfaces.Creators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateGetHeadersActionFilter(IActionErrorCreator actionErrorCreator) : 
        IAsyncActionFilter
    {
        private readonly IActionErrorCreator _actionErrorCreator = 
            actionErrorCreator;

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var groupHeaderValue = context.HttpContext
                .Request
                .Headers["Group"]
                .ToString();

            var sizeHeaderValue = context.HttpContext
                .Request
                .Headers["SizeType"]
                .ToString();

            var priceMinHeaderValueString = context.HttpContext
                .Request
                .Headers["PriceMin"];

            var priceMaxHeaderValueString = context.HttpContext
                .Request
                .Headers["PriceMax"];

            if (!string.IsNullOrEmpty(groupHeaderValue) && 
                !string.Equals(
                    groupHeaderValue, 
                    "new", 
                    StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(
                    groupHeaderValue, 
                    "sale", 
                    StringComparison.OrdinalIgnoreCase)
                )
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "Group",
                    "Invalid Group.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));

                return;
            }

            if (!string.IsNullOrEmpty(sizeHeaderValue) &&
                !string.Equals(
                    sizeHeaderValue, 
                    "small", 
                    StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(
                    sizeHeaderValue, 
                    "medium", 
                    StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(
                    sizeHeaderValue, 
                    "large", 
                    StringComparison.OrdinalIgnoreCase)
                )
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "Size",
                    "Invalid Size.",
                    400,
                    problemDetails => new BadRequestObjectResult(problemDetails));
                
                return;
            }

            if(!string.IsNullOrEmpty(priceMinHeaderValueString))
            {
                if(double.TryParse(
                    priceMinHeaderValueString, 
                    out var priceMinHeaderValue))
                {
                    if (priceMinHeaderValue < 0)
                    {
                        _actionErrorCreator
                            .CreateActionError(
                            context,
                            "Price",
                            "Minimum Price cannot be negative.",
                            400,
                            problemDetails => new BadRequestObjectResult(problemDetails));

                        return;
                    }
                }
            }

            if (!string.IsNullOrEmpty(priceMaxHeaderValueString))
            {
                if (double.TryParse(
                    priceMaxHeaderValueString, 
                    out var priceMaxHeaderValue))
                {
                    if (priceMaxHeaderValue <= 0)
                    {
                        _actionErrorCreator
                            .CreateActionError(
                            context,
                            "Price",
                            "Maximum Price must be gearter than 0.",
                            400,
                            problemDetails => new BadRequestObjectResult(problemDetails));

                        return;
                    }
                }
            }

            if(!string.IsNullOrEmpty(priceMinHeaderValueString) &&
                !string.IsNullOrEmpty(priceMaxHeaderValueString))
            {
                if (double.TryParse(
                        priceMinHeaderValueString, 
                        out var priceMinHeaderValue) &&
                    double.TryParse(
                        priceMaxHeaderValueString, 
                        out var priceMaxHeaderValue)
                    )
                {
                    if(priceMaxHeaderValue <= priceMinHeaderValue)
                    {
                        _actionErrorCreator
                            .CreateActionError(
                            context,
                            "Price",
                            "Minimum Price must be lower than Maximum Price.",
                            400,
                            problemDetails => new BadRequestObjectResult(problemDetails));

                        return;
                    }
                }
            }

            await next();
        }
    }
}
