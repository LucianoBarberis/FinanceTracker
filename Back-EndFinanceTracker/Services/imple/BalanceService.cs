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

        public async Task<decimal> GetBalance(int userId)
        {
            try
            {
                var incomes = await GetIncomes(userId);
                var egress = await GetEgress(userId);
                return incomes - egress;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al calcular el balance: " + ex.Message);
            }
        }

        public async Task<decimal> GetEgress(int userId)
        {
            try
            {
                var amounts = await _repository.GetAmounts(userId);
                var egresosTotal = amounts.FirstOrDefault(t => t.Type == TransactionType.Egreso);

                return egresosTotal?.Total ?? 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los egresos: " + ex.Message);
            }
        }

        public async Task<decimal> GetIncomes(int userId)
        {
            try
            {
                var amounts = await _repository.GetAmounts(userId);
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
