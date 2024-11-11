using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters
{
    public class Plant_ValidateGetHeadersAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var groupHeaderValue = context.HttpContext.Request.Headers["Group"].ToString();

            var sizeHeaderValue = context.HttpContext.Request.Headers["SizeType"].ToString();

            var priceMinHeaderValueString = context.HttpContext.Request.Headers["PriceMin"];

            var priceMaxHeaderValueString = context.HttpContext.Request.Headers["PriceMax"];

            if (!string.IsNullOrEmpty(groupHeaderValue) && 
                !string.Equals(groupHeaderValue, "new", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(groupHeaderValue, "sale", StringComparison.OrdinalIgnoreCase))
            {
                ModelErrors.AddBadRequestActionModelError(context, "Group", "Group is invalid.");
            }

            if (!string.IsNullOrEmpty(sizeHeaderValue) &&
                !string.Equals(sizeHeaderValue, "small", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(sizeHeaderValue, "medium", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(sizeHeaderValue, "large", StringComparison.OrdinalIgnoreCase))
            {
                ModelErrors.AddBadRequestActionModelError(context, "Group", "Size Type is invalid.");
            }

            if(!string.IsNullOrEmpty(priceMinHeaderValueString))
            {
                if(double.TryParse(priceMinHeaderValueString, out var priceMinHeaderValue))
                {
                    if (priceMinHeaderValue < 0)
                    {
                        ModelErrors.AddBadRequestActionModelError(context, "PriceMin", "Minimum Price cannot be negative.");
                    }
                }
            }

            if (!string.IsNullOrEmpty(priceMaxHeaderValueString))
            {
                if (double.TryParse(priceMaxHeaderValueString, out var priceMaxHeaderValue))
                {
                    if (priceMaxHeaderValue <= 0)
                    {
                        ModelErrors.AddBadRequestActionModelError(context, "PriceMin", "Maximum Price must be greater than 0.");
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
                        ModelErrors.AddBadRequestActionModelError(context, "Price", "Minimum Price must be lower than Maximum Price.");
                    }
                }
            }
        }
    }
}
