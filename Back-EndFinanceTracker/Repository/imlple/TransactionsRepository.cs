using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back_EndFinanceTracker.Repository.imlple
{
    public class TransactionsRepository : ITransactionRepository
    {
        private FinanceContext _context;
        public TransactionsRepository(FinanceContext financeContext) 
        {
            _context = financeContext;
        }

        public async Task<IEnumerable<BalanceDTO>> GetAmounts(int userId, DateTime dateTimeLimit)
        {
            return await _context.Transactions
                .Where(x => x.DateTime >= dateTimeLimit)
                .Where(x => x.UserId == userId)
                .GroupBy(t => t.Type)
                .Select(group => new BalanceDTO
                {
                    Type = group.Key,
                    Total = group.Sum(t => t.Amount),
                })
                .ToListAsync();
        }

        public async Task<decimal> GetCategoryTotals(int categoryId, int userId)
        {
            return await _context.Transactions
                .Where(t => t.CategoryId == categoryId && t.Type == Enums.TransactionType.Egreso && t.UserId == userId)
                .SumAsync(t => t.Amount);
        }

        public async Task Add(Transaction entity)
        {
            await _context.AddAsync(entity);
        }

        public void Delete(Transaction entity)
        {
            _context.Transactions.Remove(entity);
        }

        public async Task<IEnumerable<Transaction>> Get(int userId)
        {
            return await _context.Transactions.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Transaction?> GetById(int id, int userId)
        {
            return await _context.Transactions.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(Transaction entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
