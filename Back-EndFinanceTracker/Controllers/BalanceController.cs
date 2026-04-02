using Back_EndFinanceTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back_EndFinanceTracker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {
        private IBalanceService _balanceService;
        public BalanceController(IBalanceService balanceService) 
        {
            _balanceService = balanceService;
        }

        private int GetUserId()
        {
            var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            return claim != null ? int.Parse(claim.Value) : -1;
        }

        [HttpGet("{dateTime}")]
        public async Task<IActionResult> GetTotal(DateTime dateTime)
        {
            try
            {
                var total = await _balanceService.GetBalance(GetUserId(), dateTime);
                return Ok(total);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al calcular el balance total." + ex);
            }
        }

        [HttpGet("incomes/{dateTime}")]
        public async Task<IActionResult> GetIncomes(DateTime dateTime) 
        {
            try
            {
                var incomes = await _balanceService.GetIncomes(GetUserId(), dateTime);
                return Ok(incomes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener el total de ingresos." + ex);
            }
        }

        [HttpGet("egress/{dateTime}")]
        public async Task<IActionResult> GetEgress(DateTime dateTime)
        {
            try
            {
                var egress = await _balanceService.GetEgress(GetUserId(), dateTime);
                return Ok(egress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener el total de egresos." + ex);
            }
        }

    }
}
