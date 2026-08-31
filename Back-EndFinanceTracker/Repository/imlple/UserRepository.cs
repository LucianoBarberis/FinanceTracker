using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_EndFinanceTracker.Repository.imlple
{
    public class UserRepository : IUserRepository
    {
        private readonly FinanceContext _context;

        public UserRepository(FinanceContext context) 
        {
            _context = context;
        }

        public async Task Add(User entity)
        {
            await _context.Users.AddAsync(entity);
        }

        public void Delete(User entity)
        {
            _context.Users.Remove(entity);
        }

        public async Task<IEnumerable<User>> Get(int userId)
        {
            return await _context.Users.AsNoTracking().Where(u => u.UserId == userId).ToListAsync();
        }

        public async Task<User?> GetById(int id, int userId)
        {
            // userId is used for authorization validation: the caller must request
            // the entity that belongs to them. If it does not match, deny access.
            if (id != userId) return null;
            return await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == id);
        }

        public async Task<User?> GetById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        }

        public async Task<User?> GetByUserIdentifier(string identifier)
        {
            // NOTE: No AsNoTracking — Login() mutates RefreshToken/RefreshTokenExpiry on the
            // returned entity. If this were NoTracking, the changes would be silently lost.
            return await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == identifier || u.Email == identifier);
        }

        public async Task<bool> UserNameExists(string userName)
        {
            return await _context.Users.AsNoTracking().AnyAsync(u => u.UserName == userName);
        }

        public async Task<bool> EmailExists(string email)
        {
            return await _context.Users.AsNoTracking().AnyAsync(u => u.Email == email);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(User entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
