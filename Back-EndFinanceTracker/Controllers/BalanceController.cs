using Back_EndFinanceTracker.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back_EndFinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {
        private IBalanceService _balanceService;
        public BalanceController(IBalanceService balanceService) 
        {
            _balanceService = balanceService;
        }
        [HttpGet]
        public async Task<IActionResult> GetTotal()
        {
            try
            {
                var total = await _balanceService.GetBalance();
                return Ok(total);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al calcular el balance total.");
            }
        }

        [HttpGet("incomes")]
        public async Task<IActionResult> GetIncomes() 
        {
            try
            {
                var incomes = await _balanceService.GetIncomes();
                return Ok(incomes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener el total de ingresos.");
            }
        }

        [HttpGet("egress")]
        public async Task<IActionResult> GetEgress()
        {
            try
            {
                var egress = await _balanceService.GetEgress();
                return Ok(egress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener el total de egresos.");
            }
        }

    }
}
