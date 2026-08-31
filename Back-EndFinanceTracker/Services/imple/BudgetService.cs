using Back_EndFinanceTracker.DTOs;
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

        private static BudgetDTO ToDto(Budget budget) => new BudgetDTO
        {
            Id = budget.Id,
            Amount = budget.Amount,
            CategoryId = budget.CategoryId,
            UserId = budget.UserId,
            SpentAmount = budget.SpentAmount
        };

        public async Task<IEnumerable<BudgetDTO>> GetByUserId(int userId)
        {
            var budgets = await _budgetRepository.Get(userId);
            var dtos = new List<BudgetDTO>();
            foreach (var budget in budgets)
            {
                budget.SpentAmount = await CalculateSpentAmount(budget.CategoryId, userId);
                dtos.Add(ToDto(budget));
            }
            return dtos;
        }

        public async Task<BudgetDTO?> GetById(int id, int userId)
        {
            var budget = await _budgetRepository.GetById(id, userId);
            if (budget == null) return null;
            budget.SpentAmount = await CalculateSpentAmount(budget.CategoryId, userId);
            return ToDto(budget);
        }

        private async Task<decimal> CalculateSpentAmount(int categoryId, int userId)
        {
            var now = DateTime.UtcNow;
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

        public async Task<BudgetDTO> Create(Budget budget)
        {
            await _budgetRepository.Add(budget);
            await _budgetRepository.Save();
            budget.SpentAmount = await CalculateSpentAmount(budget.CategoryId, budget.UserId);
            return ToDto(budget);
        }

        public async Task<BudgetDTO?> Update(int id, int userId, Budget budget)
        {
            var existingBudget = await _budgetRepository.GetById(id, userId);
            if (existingBudget == null) return null;

            // Si se cambia la categoría, verificar que la nueva no tenga ya un presupuesto
            if (existingBudget.CategoryId != budget.CategoryId)
            {
                var existingForCategory = await GetByCategory(budget.CategoryId, userId);
                if (existingForCategory != null) return null!;
            }

            existingBudget.Amount = budget.Amount;
            existingBudget.CategoryId = budget.CategoryId;

            _budgetRepository.Update(existingBudget);
            await _budgetRepository.Save();
            existingBudget.SpentAmount = await CalculateSpentAmount(existingBudget.CategoryId, userId);
            return ToDto(existingBudget);
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
            var now = DateTime.UtcNow;
            
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
