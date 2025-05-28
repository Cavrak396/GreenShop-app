using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ActionFilters.General
{
    public class ValidateAdminKeyActionFilter(
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
            var adminKeyHeaderValue = context.HttpContext
                .Request
                .Headers["AdminKey"]
                .ToString();

            if (!_permissionControlService
                .VerifyApplication(adminKeyHeaderValue))
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
