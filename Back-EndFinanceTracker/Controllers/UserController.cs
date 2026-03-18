using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Services;
using Back_EndFinanceTracker.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back_EndFinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidator<LoginDTO> _validatorLogin;
        private readonly IValidator<RegisterDTO> _validatorRegister;
        public UserController(IUserService userService, IValidator<LoginDTO> validatorLogin, IValidator<RegisterDTO> validatorRegister) 
        {
            _userService = userService;
            _validatorLogin = validatorLogin;
            _validatorRegister = validatorRegister;
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
                return NotFound("Usuario no registrado");
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
            return Ok(newUser);
        }
    }
}
