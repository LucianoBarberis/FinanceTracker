using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;

namespace Back_EndFinanceTracker.Services
{
    public class CategoryService : ICategoryService
    {
        private IRepository<Category> _cateRepository;
        public CategoryService(IRepository<Category> repository) 
        {
            _cateRepository = repository;
        }

        public async Task<CategoryDto> AddCategory(CategoryAddDTO category)
        {
            var categoryToAdd = new Category
            {
                Name = category.Name,
                Icon = category.Icon,
                Type = category.Type
            };
            await _cateRepository.Add(categoryToAdd);
            await _cateRepository.Save();

            var categoryDto = new CategoryDto
            {
                Name = category.Name,
                Icon = category.Icon,
                Type = category.Type,
                Id = categoryToAdd.Id
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
                Id = id
            };

            return categoryDto;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategories()
        {
            var categories = await _cateRepository.Get();
            return categories.Select(category => new CategoryDto
            {
                Name = category.Name,
                Icon = category.Icon,
                Type = category.Type,
                Id = category.Id
            }).Reverse();
        }

        public async Task<CategoryDto> GetCategoryById(int id)
        {
            var category = await _cateRepository.GetById(id);
            if(category == null)
            {
                return null;
            }

            return new CategoryDto
            {
                Name = category.Name,
                Icon = category.Icon,
                Type= category.Type,
                Id = category.Id
            };
        }

        public async Task<CategoryDto> UpdateCategory(int id, CategoryDto category)
        {
            var categoryToUpdate = await _cateRepository.GetById(id);
            if(category.Id != id || categoryToUpdate == null) return null;

            categoryToUpdate.Name = category.Name;
            categoryToUpdate.Type = category.Type;
            categoryToUpdate.Icon = category.Icon;

            _cateRepository.Update(categoryToUpdate);
            await _cateRepository.Save();

            return new CategoryDto
            {
                Name = categoryToUpdate.Name,
                Icon = categoryToUpdate.Icon,
                Type = categoryToUpdate.Type,
                Id = categoryToUpdate.Id
            };
        }
    }
}
