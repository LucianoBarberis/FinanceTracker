using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Enums;
using Back_EndFinanceTracker.Models;
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
            try
            {
                var incomes = await GetIncomes(userId, dateTime);
                var egress = await GetEgress(userId, dateTime);
                return incomes - egress;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al calcular el balance: " + ex.Message);
            }
        }

        public async Task<decimal> GetEgress(int userId, DateTime dateTimeLimit)
        {
            try
            {
                var amounts = await _repository.GetAmounts(userId, dateTimeLimit);
                var egresosTotal = amounts.FirstOrDefault(t => t.Type == TransactionType.Egreso);

                return egresosTotal?.Total ?? 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los egresos: " + ex.Message);
            }
        }

        public async Task<decimal> GetIncomes(int userId, DateTime dateTimeLimit)
        {
            try
            {
                var amounts = await _repository.GetAmounts(userId, dateTimeLimit);
                var ingresoTotal = amounts.FirstOrDefault(t => t.Type == TransactionType.Ingreso);

                return ingresoTotal?.Total ?? 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los ingresos: " + ex.Message);
            }
        }
    }
}
