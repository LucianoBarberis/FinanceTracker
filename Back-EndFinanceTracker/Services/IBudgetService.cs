using Back_EndFinanceTracker.Models;

namespace Back_EndFinanceTracker.Services
{
    public interface IBudgetService
    {
        Task<IEnumerable<Budget>> GetByUserId(int userId);
        Task<Budget?> GetById(int id, int userId);
        Task<Budget?> GetByCategory(int categoryId, int userId);
        Task<Budget> Create(Budget budget);
        Task<Budget> Update(int id, int userId, Budget budget);
        Task<bool> Delete(int id, int userId);
        Task<string?> CheckBudgetLimit(int categoryId, int userId, decimal newAmount, DateTime transactionDate);
    }
}
