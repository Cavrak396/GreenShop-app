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

        public async Task<List<Plant>> GetOtherPlantsAsync(string id)
        {
            return await _dbContext.Plants
                .Where(p => p.PlantId != id)
                .ToListAsync();
        }

        public async Task<Plant?> GetPlantByIdAsync(string id)
        {
            return await _dbContext.Plants.FindAsync(id);
        }

        public async Task<Plant?> GetPlantByNameAndSizeAsync(string name, SizeValue size)
        {
            return await _dbContext.Plants
                .FirstOrDefaultAsync(p => p.Name!.ToLower().Trim() == name.ToLower().Trim() 
                && p.Size == size);
        }

        public async Task<Dictionary<string, Plant>> GetPlantsByIdsAsync(List<string> ids)
        {
            return await _dbContext.Plants
                .Where(p => ids.Contains(p.PlantId!))
                .ToDictionaryAsync(p => p.PlantId!);
        }

        public async Task<int> GetTotalNumberOfPlantsAsync()
        {
            return await _dbContext.Plants.CountAsync();
        }

        public async Task<int> GetNumberOfPlantsByCategoryAsync(string category)
        {
            return await _dbContext.Plants
                .CountAsync(p => p.Category!.ToLower().Trim() == category.ToLower().Trim());
        }

        public async Task<int> GetNumberOfPlantsBySizeAsync(SizeValue size)
        {
            return await _dbContext.Plants
                .CountAsync(p => p.Size == size);
        }

        public async Task<Plant> AddPlantAsync(Plant plant)
        {
            var result = _dbContext.Plants.Add(plant);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task UpdatePlantAsync(Plant plant, Plant newPlant)
        {
            plant!.Name = newPlant.Name;
            plant.Short_Description = newPlant.Short_Description;
            plant.Long_Description = newPlant.Long_Description;
            plant.Size = newPlant.Size;
            plant.Category = newPlant.Category;
            plant.Price = newPlant.Price;
            plant.Image = newPlant.Image;
            plant.Acquisition_Date = newPlant.Acquisition_Date;
            plant.Tags = newPlant.Tags;
            plant.Sale_Percent = newPlant.Sale_Percent;
            plant.Sale_Percent_Private = newPlant.Sale_Percent_Private;
            plant.LivingRoom_Description = newPlant.LivingRoom_Description;
            plant.DiningRoom_Description = newPlant.DiningRoom_Description;
            plant.Office_Description = newPlant.Office_Description;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeletePlantAsync(Plant plant)
        {
            _dbContext.Plants.Remove(plant);
            await _dbContext.SaveChangesAsync();
        }
    }
}
