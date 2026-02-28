namespace Back_EndFinanceTracker.Services
{
    public interface IBalanceService
    {
        public Task<decimal> GetBalance();
        public Task<decimal> GetIncomes();
        public Task<decimal> GetEgress();
    }
}
