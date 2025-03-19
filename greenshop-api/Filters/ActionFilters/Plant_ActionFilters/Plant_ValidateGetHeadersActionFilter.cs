using greenshop_api.Modules.ActionFilterErrors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.Plant_ActionFilters
{
    public class Plant_ValidateGetHeadersActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var groupHeaderValue = context.HttpContext.Request.Headers["Group"].ToString();

            var sizeHeaderValue = context.HttpContext.Request.Headers["SizeType"].ToString();

            var priceMinHeaderValueString = context.HttpContext.Request.Headers["PriceMin"];

            var priceMaxHeaderValueString = context.HttpContext.Request.Headers["PriceMax"];

            if (!string.IsNullOrEmpty(groupHeaderValue) && 
                !string.Equals(groupHeaderValue, "new", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(groupHeaderValue, "sale", StringComparison.OrdinalIgnoreCase))
            {
                BadRequestActionFilterError.Add(context, "Group", "Group is not valid.");
                return;
            }

            if (!string.IsNullOrEmpty(sizeHeaderValue) &&
                !string.Equals(sizeHeaderValue, "small", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(sizeHeaderValue, "medium", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(sizeHeaderValue, "large", StringComparison.OrdinalIgnoreCase))
            {
                BadRequestActionFilterError.Add(context, "Group", "Size Type is not valid.");
                return;
            }

            if(!string.IsNullOrEmpty(priceMinHeaderValueString))
            {
                if(double.TryParse(priceMinHeaderValueString, out var priceMinHeaderValue))
                {
                    if (priceMinHeaderValue < 0)
                    {
                        BadRequestActionFilterError.Add(context, "PriceMin", "Minimum Price cannot be negative.");
                        return;
                    }
                }
            }

            if (!string.IsNullOrEmpty(priceMaxHeaderValueString))
            {
                if (double.TryParse(priceMaxHeaderValueString, out var priceMaxHeaderValue))
                {
                    if (priceMaxHeaderValue <= 0)
                    {
                        BadRequestActionFilterError.Add(context, "PriceMax", "Maximum Price must be greater than 0.");
                        return;
                    }
                }
            }

            if(!string.IsNullOrEmpty(priceMinHeaderValueString) &&
                !string.IsNullOrEmpty(priceMaxHeaderValueString))
            {
                if (double.TryParse(priceMinHeaderValueString, out var priceMinHeaderValue) &&
                    double.TryParse(priceMaxHeaderValueString, out var priceMaxHeaderValue))
                {
                    if(priceMaxHeaderValue <= priceMinHeaderValue)
                    {
                        BadRequestActionFilterError.Add(context, "Price", "Minimum Price must be lower than Maximum Price.");
                        return;
                    }
                }
            }

            await next();
        }
    }
}
