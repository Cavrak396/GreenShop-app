using greenshop_api.Domain.Models;
using static greenshop_api.Domain.Models.Enums.SizeEnum;
using static greenshop_api.Domain.Models.Plant;

namespace greenshop_api.Domain.Interfaces.Repositories
{
    public interface IPlantsRepository
    {
        IQueryable<Plant> GetAllPlantsQueryable();
        Task<List<Plant>> GetOtherPlantsAsync(string id);
        Task<Plant?> GetPlantByIdAsync(string id);
        Task<Plant?> GetPlantByNameAndSizeAsync(string name, Size size);
        Task<Dictionary<string, Plant>> GetPlantsByIdsAsync(List<string> ids);
        Task<int> GetTotalNumberOfPlantsAsync();
        Task<int> GetNumberOfPlantsByCategoryAsync(string category);
        Task<int> GetNumberOfPlantsBySizeAsync(Size size);
        Task<Plant> AddPlantAsync(Plant plant);
        Task UpdatePlantAsync(Plant plant, Plant newPlant);
        Task DeletePlantAsync(Plant plant);

    }
}
