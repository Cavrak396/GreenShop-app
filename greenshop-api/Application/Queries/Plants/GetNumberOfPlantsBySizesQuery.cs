using MediatR;

namespace greenshop_api.Application.Queries.Plants
{
    public class GetNumberOfPlantsBySizesQuery : IRequest<Dictionary<string,int>>
    {
    }
}
