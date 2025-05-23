using greenshop_api.Domain.Interfaces.Creators;
using greenshop_api.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace greenshop_api.Filters.ExceptionFilters.Plant_ExceptionFilters
{
    public class Plant_HandleUpdateExceptionFilter(
        IPlantsRepository plantsRepository,
        IExceptionCreator exceptionCreator) : 
        IAsyncExceptionFilter
    {
        private readonly IPlantsRepository _plantsRepository = 
            plantsRepository;
        private readonly IExceptionCreator _exceptionCreator = 
            exceptionCreator;

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var plantId = context.RouteData
                .Values["plantId"] as string;

            if (await _plantsRepository
                .GetPlantByIdAsync(plantId!) == null)
            {
                _exceptionCreator
                    .CreateException(
                    context,
                    "Plant",
                    "Plant does not exist anymore.",
                    404,
                    problemDetails => new NotFoundObjectResult(problemDetails));
            }
        }
    }
}
