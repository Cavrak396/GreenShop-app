using greenshop_api.Domain.Interfaces.Repositories;
using greenshop_api.Domain.Models;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Infrastructure.Repositories
{
    public class PlantsRepository(ApplicationDbContext dbContext) : IPlantsRepository
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

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
    }
}
