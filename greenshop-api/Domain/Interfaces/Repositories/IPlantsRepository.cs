using greenshop_api.Domain.Models;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface IPlantsRepository
    {
        Task<Plant?> GetPlantByIdAsync(string id);
        Task<Dictionary<string, Plant>> GetPlantsByIdsAsync(List<string> ids);
    }
}
