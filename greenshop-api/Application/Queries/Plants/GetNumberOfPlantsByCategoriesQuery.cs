using MediatR;

namespace greenshop_api.Application.Queries.Plants
{
    public class GetNumberOfPlantsByCategoriesQuery : IRequest<Dictionary<string,int>>
    {
        public List<string>? Categories { get; set; }
    }
}
