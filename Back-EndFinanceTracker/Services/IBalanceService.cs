namespace Back_EndFinanceTracker.Services
{
    public interface IBalanceService
    {
        public Task<decimal> GetBalance(int userId);
        public Task<decimal> GetIncomes(int userId);
        public Task<decimal> GetEgress(int userId);
    }
}
