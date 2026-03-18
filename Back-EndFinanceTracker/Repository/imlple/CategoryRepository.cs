using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_EndFinanceTracker.Repository.imlple
{
    public class CategoryRepository : IRepository<Category>
    {
        private FinanceContext _context;
        public CategoryRepository(FinanceContext financeContext) 
        {
            _context = financeContext;
        }
        public async Task Add(Category entity)
        {
            await _context.AddAsync(entity);
        }

        public void Delete(Category entity)
        {
            _context.Categories.Remove(entity);
        }

        public async Task<IEnumerable<Category>> Get(int userId)
        {
            return await _context.Categories.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Category?> GetById(int id, int userId)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(Category entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
