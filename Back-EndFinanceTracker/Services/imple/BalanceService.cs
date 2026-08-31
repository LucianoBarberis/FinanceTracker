using Back_EndFinanceTracker.Enums;
using Back_EndFinanceTracker.Repository;

namespace Back_EndFinanceTracker.Services.imple
{
    public class BalanceService : IBalanceService
    {
        private ITransactionRepository _repository;

        public BalanceService(ITransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<decimal> GetBalance(int userId, DateTime dateTime)
        {
            var amounts = await _repository.GetAmounts(userId, dateTime);
            var incomes = amounts.FirstOrDefault(t => t.Type == TransactionType.Ingreso)?.Total ?? 0;
            var egress = amounts.FirstOrDefault(t => t.Type == TransactionType.Egreso)?.Total ?? 0;
            return incomes - egress;
        }

        public async Task<decimal> GetEgress(int userId, DateTime dateTimeLimit)
        {
            var amounts = await _repository.GetAmounts(userId, dateTimeLimit);
            var egresosTotal = amounts.FirstOrDefault(t => t.Type == TransactionType.Egreso);

            return egresosTotal?.Total ?? 0;
        }

        public async Task<decimal> GetIncomes(int userId, DateTime dateTimeLimit)
        {
            var amounts = await _repository.GetAmounts(userId, dateTimeLimit);
            var ingresoTotal = amounts.FirstOrDefault(t => t.Type == TransactionType.Ingreso);

            return ingresoTotal?.Total ?? 0;
        }
    }
}
