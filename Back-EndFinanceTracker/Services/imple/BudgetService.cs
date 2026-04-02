using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using Microsoft.EntityFrameworkCore;
using Back_EndFinanceTracker.Data;

namespace Back_EndFinanceTracker.Services.imple
{
    public class BudgetService : IBudgetService
    {
        private readonly IRepository<Budget> _budgetRepository;
        private readonly FinanceContext _context;

        public BudgetService(IRepository<Budget> budgetRepository, FinanceContext context)
        {
            _budgetRepository = budgetRepository;
            _context = context;
        }

        public async Task<IEnumerable<Budget>> GetByUserId(int userId)
        {
            var budgets = await _budgetRepository.Get(userId);
            foreach (var budget in budgets)
            {
                budget.SpentAmount = await CalculateSpentAmount(budget.CategoryId, userId);
            }
            return budgets;
        }

        public async Task<Budget?> GetById(int id, int userId)
        {
            var budget = await _budgetRepository.GetById(id, userId);
            if (budget != null)
            {
                budget.SpentAmount = await CalculateSpentAmount(budget.CategoryId, userId);
            }
            return budget;
        }

        private async Task<decimal> CalculateSpentAmount(int categoryId, int userId)
        {
            var now = DateTime.Now;
            return await _context.Transactions
                .Where(t => t.CategoryId == categoryId && 
                            t.UserId == userId && 
                            t.DateTime.Month == now.Month && 
                            t.DateTime.Year == now.Year)
                .SumAsync(t => t.Amount);
        }

        public async Task<Budget?> GetByCategory(int categoryId, int userId)
        {
            return await _context.Budgets
                .FirstOrDefaultAsync(b => b.CategoryId == categoryId && b.UserId == userId);
        }

        public async Task<Budget> Create(Budget budget)
        {
            await _budgetRepository.Add(budget);
            await _budgetRepository.Save();
            return budget;
        }

        public async Task<Budget> Update(int id, int userId, Budget budget)
        {
            var existingBudget = await _budgetRepository.GetById(id, userId);
            if (existingBudget == null) return null!;

            existingBudget.Amount = budget.Amount;
            existingBudget.CategoryId = budget.CategoryId;

            _budgetRepository.Update(existingBudget);
            await _budgetRepository.Save();
            return existingBudget;
        }

        public async Task<bool> Delete(int id, int userId)
        {
            var budget = await _budgetRepository.GetById(id, userId);
            if (budget == null) return false;

            _budgetRepository.Delete(budget);
            await _budgetRepository.Save();
            return true;
        }

        public async Task<string?> CheckBudgetLimit(int categoryId, int userId, decimal newAmount, DateTime transactionDate)
        {
            var now = DateTime.Now;
            
            // Si la transacción no es para el mes/año actual, no disparamos alerta de presupuesto mensual
            if (transactionDate.Month != now.Month || transactionDate.Year != now.Year)
            {
                return null;
            }

            var budget = await GetByCategory(categoryId, userId);
            if (budget == null) return null;

            var totalSpent = await CalculateSpentAmount(categoryId, userId);
            var projectedTotal = totalSpent + newAmount;

            if (projectedTotal > budget.Amount)
            {
                return $"¡Alerta! Con esta transacción has superado tu límite de {budget.Amount:C} para esta categoría. Gasto total proyectado: {projectedTotal:C}";
            }
            
            if (projectedTotal > budget.Amount * 0.8m)
            {
                return $"Aviso: Estás cerca de alcanzar tu límite mensual ({projectedTotal:C} de {budget.Amount:C}).";
            }

            return null;
        }
    }
}
