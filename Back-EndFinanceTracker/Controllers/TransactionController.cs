using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;

namespace Back_EndFinanceTracker.Controllers
{
    [Authorize]
    [EnableRateLimiting("fixed")]
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private ITransactionService _transactionService;
        private IValidator<TransactionAddDTO> _validator;
        private IValidator<TransactionUpdateDTO> _validatorUpdate;
        public TransactionController(ITransactionService service, IValidator<TransactionAddDTO> validator, IValidator<TransactionUpdateDTO> validatorUpdate) 
        {
            _transactionService = service;
            _validator = validator;
            _validatorUpdate = validatorUpdate;
        }

        private int? GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);
            return claim != null ? int.Parse(claim.Value) : null;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> GetAll()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            return Ok(await _transactionService.GetAll(userId.Value));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDTO>> GetById(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var transaction = await _transactionService.GetById(id, userId.Value);
            if (transaction == null) 
            {
                return NotFound(transaction);
            }
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult> Add(TransactionAddDTO transactionDTO) 
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var result = await _validator.ValidateAsync(transactionDTO);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }

            var response = await _transactionService.Add(transactionDTO, userId.Value);

            if(response == null) return BadRequest("Categoria no encontrada");

            // Si hay un mensaje de alerta (presupuesto excedido), lo incluimos en la respuesta.
            return CreatedAtAction(nameof(GetById), new { id = response.Transaction.Id }, response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDTO>> Delete(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var result = await _transactionService.DeleteById(id, userId.Value);

            if(result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] TransactionUpdateDTO transactionDTO, int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var result = await _validatorUpdate.ValidateAsync(transactionDTO);

            if (!result.IsValid) 
            {
                return BadRequest(result.Errors);
            }
            
            if (id != transactionDTO.Id)
            {
                 return BadRequest("El ID de la transacción no coincide.");
            }

            var contactUpdated = await _transactionService.Update(transactionDTO, id, userId.Value);

            if (contactUpdated == null)
            {
                return BadRequest("No se pudo actualizar la transacción. Verifique que el ID sea correcto y la categoría exista.");
            }

            return Ok(contactUpdated);
        }
    }
}
