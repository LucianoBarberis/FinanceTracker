using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Enums;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;

namespace Back_EndFinanceTracker.Services
{
    public class BalanceService : IBalanceService
    {
        private IRepository<Transaction> _repository;

        public BalanceService(IRepository<Transaction> repository)
        {
            _repository = repository;
        }

        public async Task<decimal> GetBalance()
        {
            try
            {
                var incomes = await GetIncomes();
                var egress = await GetEgress();
                return incomes - egress;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al calcular el balance: " + ex.Message);
            }
        }

        public async Task<decimal> GetEgress()
        {
            try
            {
                var amounts = await _repository.GetAmounts();
                var egresosTotal = amounts.FirstOrDefault(t => t.Type == TransactionType.Egreso);

                return egresosTotal?.Total ?? 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los egresos: " + ex.Message);
            }
        }

        public async Task<decimal> GetIncomes()
        {
            try
            {
                var amounts = await _repository.GetAmounts();
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
