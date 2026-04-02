namespace Back_EndFinanceTracker.Services
{
    public interface IBalanceService
    {
        public Task<decimal> GetBalance(int userId, DateTime dateTime);
        public Task<decimal> GetIncomes(int userId, DateTime dateTime);
        public Task<decimal> GetEgress(int userId, DateTime dateTime);
    }
}
