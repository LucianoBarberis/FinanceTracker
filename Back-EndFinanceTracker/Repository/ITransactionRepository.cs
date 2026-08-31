using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;

namespace Back_EndFinanceTracker.Repository
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        public Task<IEnumerable<BalanceDTO>> GetAmounts(int userId, DateTime dateTimeLimit);
        public Task<decimal> GetCategoryTotals(int categoryId, int userId);
        public Task<Dictionary<int, decimal>> GetCategoryTotalsByCategory(int userId);
    }
}
