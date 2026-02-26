using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;


using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Back_EndFinanceTracker.Repository
{
    public class TransactionsRepository : IRepository<Transaction>
    {
        private FinanceContext _context;
        public TransactionsRepository(FinanceContext financeContext) 
        {
            _context = financeContext;
        }

        public async Task<Category> GetCategoryById(int CategoryId)
        {
            var result = await _context.Categories.FindAsync(CategoryId);

            if (result == null) return null;

            return result;
        }

        public async Task Add(Transaction entity)
        {
            await _context.AddAsync(entity);
        }

        public void Delete(Transaction entity)
        {
            _context.Transactions.Remove(entity);
        }

        public async Task<IEnumerable<Transaction>> Get()
        {
            return await _context.Transactions.ToListAsync();
        }

        public async Task<Transaction> GetById(int id)
        {
            return await _context.Transactions.FindAsync(id);
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
