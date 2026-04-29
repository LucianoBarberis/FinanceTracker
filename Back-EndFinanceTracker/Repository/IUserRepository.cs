using Back_EndFinanceTracker.Models;

namespace Back_EndFinanceTracker.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByUserIdentifier(string identifier);
        Task<bool> UserNameExists(string userName);
        Task<bool> EmailExists(string email);
        Task<User?> GetById(int id);
    }
}
