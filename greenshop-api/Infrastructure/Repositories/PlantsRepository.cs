using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using static greenshop_api.Domain.Models.Plant;

namespace greenshop_api.Infrastructure.Repositories
{
    public class PlantsRepository(ApplicationDbContext dbContext) : IPlantsRepository
    {
        private readonly ApplicationDbContext _dbContext = dbContext;
        public IQueryable<Plant> GetAllPlantsQueryable()
        {
            return _dbContext.Plants.AsQueryable();
        }

        public async Task<Plant?> GetPlantByIdAsync(string id)
        {
            return await _dbContext.Plants.FindAsync(id);
        }

        public async Task<Dictionary<string, Plant>> GetPlantsByIdsAsync(List<string> ids)
        {
            return await _dbContext.Plants
                .Where(p => ids.Contains(p.PlantId!))
                .ToDictionaryAsync(p => p.PlantId!);
        }

        public async Task<int> GetTotalNumberOfPlants()
        {
            return await _dbContext.Plants.CountAsync();
        }

        public async Task<int> GetNumberOfPlantsByCategory(string category)
        {
            return await _dbContext.Plants
                .CountAsync(p => p.Category!.ToLower().Trim() == category.ToLower().Trim());
        }

        public async Task<int> GetNumberOfPlantsBySize(SizeValue size)
        {
            return await _dbContext.Plants
                .CountAsync(p => p.Size == size);
        }
    }
}
