using greenshop_api.Domain.Models;
using static greenshop_api.Domain.Models.Plant;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface IPlantsRepository
    {
        IQueryable<Plant> GetAllPlantsQueryable();
        Task<Plant?> GetPlantByIdAsync(string id);
        Task<Dictionary<string, Plant>> GetPlantsByIdsAsync(List<string> ids);
        Task<int> GetTotalNumberOfPlants();
        Task<int> GetNumberOfPlantsByCategory(string category);
        Task<int> GetNumberOfPlantsBySize(SizeValue size);
    }
}
