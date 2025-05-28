using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.General
{
    public class ValidateApplicationKeyActionFilter(
        IPermissionControlService permissionControlService,
        IActionErrorCreator actionErrorCreator) : 
        IAsyncActionFilter
    {
        private readonly IPermissionControlService _permissionControlService = 
            permissionControlService;
        private readonly IActionErrorCreator _actionErrorCreator =
            actionErrorCreator;  
        public async Task OnActionExecutionAsync(
            ActionExecutingContext context, 
            ActionExecutionDelegate next)
        {
            var applicationKeyHeaderValue = context.HttpContext
                .Request
                .Headers["ApplicationKey"]
                .ToString();

            if(!_permissionControlService
                .VerifyApplication(applicationKeyHeaderValue))
            {
                _actionErrorCreator
                    .CreateActionError(
                    context,
                    "Permission",
                    "Access denied.",
                    403,
                    problemDetails => new ObjectResult(problemDetails));

                return;
            }

            await next();
        }
    }
}
