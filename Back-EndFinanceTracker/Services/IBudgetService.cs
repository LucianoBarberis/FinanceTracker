using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;

namespace Back_EndFinanceTracker.Services
{
    public interface IBudgetService
    {
        Task<IEnumerable<BudgetDTO>> GetByUserId(int userId);
        Task<BudgetDTO?> GetById(int id, int userId);
        Task<Budget?> GetByCategory(int categoryId, int userId);
        Task<BudgetDTO> Create(Budget budget);
        Task<BudgetDTO?> Update(int id, int userId, Budget budget);
        Task<bool> Delete(int id, int userId);
        Task<string?> CheckBudgetLimit(int categoryId, int userId, decimal newAmount, DateTime transactionDate);
    }
}
