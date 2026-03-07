using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;

namespace Back_EndFinanceTracker.Services
{
    public class CategoryService : ICategoryService
    {
        private IRepository<Category> _cateRepository;
        private ITransactionRepository _transactionRepository;
        private IBalanceService _balanceService;
        public CategoryService(IRepository<Category> repository, ITransactionRepository repository1, IBalanceService balanceService) 
        {
            _cateRepository = repository;
            _transactionRepository = repository1;
            _balanceService = balanceService;
        }

        public async Task<decimal> TotalForCategory(int id)
        {
            return await _transactionRepository.GetCategoryTotals(id);
        }

        public async Task<CategoryDto> AddCategory(CategoryAddDTO category)
        {
            var categoryToAdd = new Category
            {
                Name = category.Name,
                Icon = category.Icon,
                Type = category.Type,
                Color = category.Color,
            };
            await _cateRepository.Add(categoryToAdd);
            await _cateRepository.Save();

            var categoryDto = new CategoryDto
            {
                Name = category.Name,
                Icon = category.Icon,
                Type = category.Type,
                Id = categoryToAdd.Id,
                Color = categoryToAdd.Color,
            };

            return categoryDto;
        }

        public async Task<CategoryDto> DeleteCategory(int id)
        {
            var catToDelete = await _cateRepository.GetById(id);
            if(catToDelete == null)
            {
                return null;
            }

            _cateRepository.Delete(catToDelete);
            await _cateRepository.Save();

            var categoryDto = new CategoryDto
            {
                Name = catToDelete.Name,
                Icon = catToDelete.Icon,
                Type = catToDelete.Type,
                Id = id,
                Color = catToDelete.Color,
            };

            return categoryDto;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategories()
        {
            var categories = await _cateRepository.Get();

            var totalEgress = await _balanceService.GetEgress();

            var categoryDtos = new List<CategoryDto>();

            foreach (var category in categories) 
            {
                var categoryTotal = await TotalForCategory(category.Id);
                categoryDtos.Add(new CategoryDto
                {
                    Name = category.Name,
                    Icon = category.Icon,
                    Type = category.Type,
                    Id = category.Id,
                    Color = category.Color,
                    Percentaje = totalEgress > 0 ? (categoryTotal / totalEgress) * 100 : 0,
                    Total = categoryTotal
                });
            }

            return categoryDtos.AsEnumerable().Reverse();
        }

        public async Task<CategoryDto> GetCategoryById(int id)
        {
            var category = await _cateRepository.GetById(id);
            if (category == null)
            {
                return null;
            }
            var totalIncomes = await _balanceService.GetIncomes();
            var categoryTotal = await TotalForCategory(id);

            return new CategoryDto
            {
                Name = category.Name,
                Icon = category.Icon,
                Type= category.Type,
                Id = category.Id,
                Color = category.Color,
                Total= totalIncomes,
                Percentaje= totalIncomes > 0 ? (categoryTotal / totalIncomes) * 100 : 0,
            };
        }

        public async Task<CategoryDto> UpdateCategory(int id, CategoryDto category)
        {
            var categoryToUpdate = await _cateRepository.GetById(id);
            if(category.Id != id || categoryToUpdate == null) return null;

            categoryToUpdate.Name = category.Name;
            categoryToUpdate.Type = category.Type;
            categoryToUpdate.Icon = category.Icon;
            categoryToUpdate.Color = category.Color;

            _cateRepository.Update(categoryToUpdate);
            await _cateRepository.Save();

            return new CategoryDto
            {
                Name = categoryToUpdate.Name,
                Icon = categoryToUpdate.Icon,
                Type = categoryToUpdate.Type,
                Id = categoryToUpdate.Id,
                Color = categoryToUpdate.Color,
            };
        }
    }
}
