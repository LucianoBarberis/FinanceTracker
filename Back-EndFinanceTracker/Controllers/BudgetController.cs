using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        private int? GetUserId()
        {
            var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            return claim != null ? int.Parse(claim.Value) : null;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BudgetDTO>>> GetAll()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var budgets = await _budgetService.GetByUserId(userId.Value);
            return Ok(budgets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDTO>> GetById(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var budget = await _budgetService.GetById(id, userId.Value);
            if (budget == null) return NotFound();
            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<BudgetDTO>> Create(BudgetAddDTO budgetDTO)
        {
            var validationResult = await _validator.ValidateAsync(budgetDTO);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            // Verificar si ya existe un presupuesto para esta categoría
            var existing = await _budgetService.GetByCategory(budgetDTO.CategoryId, userId.Value);
            if (existing != null) return BadRequest("Ya existe un presupuesto definido para esta categoría.");

            var budget = new Budget
            {
                Amount = budgetDTO.Amount,
                CategoryId = budgetDTO.CategoryId,
                UserId = userId.Value
            };

            var createdBudget = await _budgetService.Create(budget);
            return CreatedAtAction(nameof(GetById), new { id = createdBudget.Id }, createdBudget);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BudgetDTO>> Update(int id, BudgetAddDTO budgetDTO)
        {
            var validationResult = await _validator.ValidateAsync(budgetDTO);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            
            var budget = new Budget
            {
                Amount = budgetDTO.Amount,
                CategoryId = budgetDTO.CategoryId
            };

            var updatedBudget = await _budgetService.Update(id, userId.Value, budget);
            if (updatedBudget == null)
            {
                // Distinguir: presupuesto no existente vs. categoría con presupuesto ya definido
                var existingBudget = await _budgetService.GetById(id, userId.Value);
                if (existingBudget == null) return NotFound();
                return BadRequest("Ya existe un presupuesto definido para esta categoría.");
            }

            return Ok(updatedBudget);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var success = await _budgetService.Delete(id, userId.Value);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
