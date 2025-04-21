using greenshop_api.Application.Queries.Plants;
using MediatR;

namespace greenshop_api.Application.Handlers.Plants
{
    public class GetNumberOfPlantsBySizesHandler : IRequestHandler<GetNumberOfPlantsBySizesQuery, Dictionary<string, int>>
    {
        public Task<Dictionary<string, int>> Handle(GetNumberOfPlantsBySizesQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
