using Back_EndFinanceTracker.DTOs;

namespace Back_EndFinanceTracker.Services
{
    public interface ICategoryService
    {
        public Task<IEnumerable<CategoryDto>> GetCategories();
        public Task<CategoryDto> GetCategoryById(int id);
        public Task<CategoryDto> AddCategory(CategoryAddDTO category);
        public Task<CategoryDto> UpdateCategory(int id, CategoryDto category);
        public Task<CategoryDto> DeleteCategory(int id);
    }
}
