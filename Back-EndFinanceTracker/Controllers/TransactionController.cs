using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Services;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_EndFinanceTracker.Controllers
{
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

        [HttpGet]
        public async Task<IEnumerable<TransactionDTO>> GetAll()
        {
            return await _transactionService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDTO>> GetById(int id)
        {
            var transaction = await _transactionService.GetById(id);
            if (transaction == null) 
            {
                return NotFound(transaction);
            }
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult> Add(TransactionAddDTO transactionDTO) 
        {
            var result = _validator.Validate(transactionDTO);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }

            var newTransaction = await _transactionService.Add(transactionDTO);

            if(newTransaction == null) return BadRequest("Categoria no encontrada");

            return CreatedAtAction(nameof(GetById), new { id = newTransaction.Id }, newTransaction);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDTO>> Delete(int id)
        {
            var result = await _transactionService.DeleteById(id);

            if(result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] TransactionUpdateDTO transactionDTO, int id)
        {
            var result = _validatorUpdate.Validate(transactionDTO);

            if (!result.IsValid) 
            {
                return BadRequest(result.Errors);
            }
            
            if (id != transactionDTO.Id)
            {
                 return BadRequest("El ID de la transacción no coincide.");
            }

            var contactUpdated = await _transactionService.Update(transactionDTO, id);

            if (contactUpdated == null)
            {
                return BadRequest("No se pudo actualizar la transacción. Verifique que el ID sea correcto y la categoría exista.");
            }

            return Ok(contactUpdated);
        }
    }
}
