using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Back_EndFinanceTracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;
        private readonly IValidator<BudgetAddDTO> _validator;

        public BudgetController(IBudgetService budgetService, IValidator<BudgetAddDTO> validator)
        {
            _budgetService = budgetService;
            _validator = validator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetAll()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var budgets = await _budgetService.GetByUserId(userId);
            return Ok(budgets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetById(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var budget = await _budgetService.GetById(id, userId);
            if (budget == null) return NotFound();
            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<Budget>> Create(BudgetAddDTO budgetDTO)
        {
            var validationResult = await _validator.ValidateAsync(budgetDTO);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            // Verificar si ya existe un presupuesto para esta categoría
            var existing = await _budgetService.GetByCategory(budgetDTO.CategoryId, userId);
            if (existing != null) return BadRequest("Ya existe un presupuesto definido para esta categoría.");

            var budget = new Budget
            {
                Amount = budgetDTO.Amount,
                CategoryId = budgetDTO.CategoryId,
                UserId = userId
            };

            var createdBudget = await _budgetService.Create(budget);
            return CreatedAtAction(nameof(GetById), new { id = createdBudget.Id }, createdBudget);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Budget>> Update(int id, BudgetAddDTO budgetDTO)
        {
            var validationResult = await _validator.ValidateAsync(budgetDTO);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            
            var budget = new Budget
            {
                Amount = budgetDTO.Amount,
                CategoryId = budgetDTO.CategoryId
            };

            var updatedBudget = await _budgetService.Update(id, userId, budget);
            if (updatedBudget == null) return NotFound();

            return Ok(updatedBudget);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var success = await _budgetService.Delete(id, userId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
