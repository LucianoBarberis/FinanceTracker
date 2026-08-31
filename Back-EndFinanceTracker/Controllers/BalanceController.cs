using Back_EndFinanceTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Back_EndFinanceTracker.Controllers
{
    [Authorize]
    [EnableRateLimiting("fixed")]
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {
        private IBalanceService _balanceService;
        private readonly ILogger<BalanceController> _logger;

        public BalanceController(IBalanceService balanceService, ILogger<BalanceController> logger)
        {
            _balanceService = balanceService;
            _logger = logger;
        }

        private int? GetUserId()
        {
            var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            return claim != null ? int.Parse(claim.Value) : null;
        }

        [HttpGet("{dateTime}")]
        public async Task<IActionResult> GetTotal(DateTime dateTime)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            try
            {
                var total = await _balanceService.GetBalance(userId.Value, dateTime);
                return Ok(total);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al calcular el balance total");
                return StatusCode(500, "Error al calcular el balance total.");
            }
        }

        [HttpGet("incomes/{dateTime}")]
        public async Task<IActionResult> GetIncomes(DateTime dateTime)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            try
            {
                var incomes = await _balanceService.GetIncomes(userId.Value, dateTime);
                return Ok(incomes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el total de ingresos");
                return StatusCode(500, "Error al obtener el total de ingresos.");
            }
        }

        [HttpGet("egress/{dateTime}")]
        public async Task<IActionResult> GetEgress(DateTime dateTime)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            try
            {
                var egress = await _balanceService.GetEgress(userId.Value, dateTime);
                return Ok(egress);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el total de egresos");
                return StatusCode(500, "Error al obtener el total de egresos.");
            }
        }

    }
}
