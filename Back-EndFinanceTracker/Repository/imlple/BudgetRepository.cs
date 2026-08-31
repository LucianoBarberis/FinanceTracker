using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_EndFinanceTracker.Repository.imlple
{
    public class BudgetRepository : IRepository<Budget>
    {
        private FinanceContext _context;
        public BudgetRepository(FinanceContext context)
        {
            _context = context;
        }
        public async Task Add(Budget entity)
        {
            await _context.AddAsync(entity);
        }

        public void Delete(Budget entity)
        {
            _context.Budgets.Remove(entity);
        }

        public async Task<IEnumerable<Budget>> Get(int userId)
        {
            return await _context.Budgets.AsNoTracking().Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Budget> GetById(int id, int userId)
        {
            return await _context.Budgets.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(Budget entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
