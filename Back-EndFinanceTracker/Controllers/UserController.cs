using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Services;
using Back_EndFinanceTracker.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;

namespace Back_EndFinanceTracker.Controllers
{
    [EnableRateLimiting("auth_strict")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidator<LoginDTO> _validatorLogin;
        private readonly IValidator<RegisterDTO> _validatorRegister;
        private readonly IValidator<RefreshTokenDTO> _validatorRefresh;
        private readonly ILogger<UserController> _logger;

        public UserController(
            IUserService userService,
            IValidator<LoginDTO> validatorLogin,
            IValidator<RegisterDTO> validatorRegister,
            IValidator<RefreshTokenDTO> validatorRefresh,
            ILogger<UserController> logger)
        {
            _userService = userService;
            _validatorLogin = validatorLogin;
            _validatorRegister = validatorRegister;
            _validatorRefresh = validatorRefresh;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginDTO>> Login(LoginDTO DTO)
        {
            var results = await _validatorLogin.ValidateAsync(DTO);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }
            var loginUser = await _userService.Login(DTO);
            if (loginUser == null)
            {
                return Unauthorized("Credenciales inválidas");
            }
            return Ok(loginUser);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO RegisterDTO)
        {
            var results = await _validatorRegister.ValidateAsync(RegisterDTO);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }
            var newUser = await _userService.Register(RegisterDTO);
            return StatusCode(StatusCodes.Status201Created, newUser);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<UserDTO>> Refresh(RefreshTokenDTO refreshTokenDTO)
        {
            var results = await _validatorRefresh.ValidateAsync(refreshTokenDTO);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }
            try
            {
                var result = await _userService.RefreshToken(refreshTokenDTO);
                return Ok(result);
            }
            catch (SecurityTokenException)
            {
                return Unauthorized("Invalid refresh token");
            }
            catch (FormatException)
            {
                return Unauthorized("Invalid refresh token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during token refresh");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
    }
}
