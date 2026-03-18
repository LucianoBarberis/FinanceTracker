using Back_EndFinanceTracker.DTOs;

namespace Back_EndFinanceTracker.Services
{
    public interface ICategoryService
    {
        public Task<IEnumerable<CategoryDto>> GetCategories(int userId);
        public Task<CategoryDto> GetCategoryById(int id, int userId);
        public Task<CategoryDto> AddCategory(CategoryAddDTO category, int userId);
        public Task<CategoryDto> UpdateCategory(int id, CategoryDto category, int userId);
        public Task<CategoryDto> DeleteCategory(int id, int userId);
        public Task<decimal> TotalForCategory(int id, int userId);
    }
}
