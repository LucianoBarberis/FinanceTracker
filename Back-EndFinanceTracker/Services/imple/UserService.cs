using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using BC = BCrypt.Net.BCrypt;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back_EndFinanceTracker.Services.imple
{
    public class UserService : IUserService
    {
        private IUserRepository _repository;
        private IJwtAuthService _jwtAuthService;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository repository, IJwtAuthService jwtAuthService, IConfiguration configuration)
        {
            _repository = repository;
            _jwtAuthService = jwtAuthService;
            _configuration = configuration;
        }
        public Task<UserDTO> DeleteUser(int UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> Login(LoginDTO loginDTO)
        {
            var user = await _repository.GetByUserIdentifier(loginDTO.UserIdentify);
            if (user == null || !BC.Verify(loginDTO.Password, user.HashedPassword))
            {
                return null;
            }
            var refreshToken = _jwtAuthService.generateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _repository.Save();

            return new UserDTO
            {
                Email = user.Email,
                UserName = user.UserName,
                Id = user.UserId,
                JWT = _jwtAuthService.generateUserToken(user.UserName, user.UserId),
                RefreshToken = refreshToken
            };
        }

        public async Task<UserDTO> Register(RegisterDTO registerDTO)
        {
            User userToAdd = new User
            {
                Email = registerDTO.Email,
                UserName = registerDTO.UserName,
                HashedPassword = BC.HashPassword(registerDTO.Password)
            };

            var refreshToken = _jwtAuthService.generateRefreshToken();
            userToAdd.RefreshToken = refreshToken;
            userToAdd.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            await _repository.Add(userToAdd);
            await _repository.Save();

            return new UserDTO
            {
                Email = registerDTO.Email,
                UserName = registerDTO.UserName,
                Id = userToAdd.UserId,
                JWT = _jwtAuthService.generateUserToken(registerDTO.UserName, userToAdd.UserId),
                RefreshToken = refreshToken
            };
        }

        public Task<UserDTO> UpdateUser(int UserId, RegisterDTO DTO)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> RefreshToken(RefreshTokenDTO refreshTokenDTO)
        {
            var principal = GetPrincipalFromExpiredToken(refreshTokenDTO.Token);
            var userId = int.Parse(principal.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _repository.GetById(userId);
            if (user == null || user.RefreshToken != refreshTokenDTO.RefreshToken || user.RefreshTokenExpiry <= DateTime.UtcNow)
            {
                throw new SecurityTokenException("Invalid refresh token");
            }

            var newJwtToken = _jwtAuthService.generateUserToken(user.UserName, user.UserId);
            var newRefreshToken = _jwtAuthService.generateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _repository.Save();

            return new UserDTO
            {
                Email = user.Email,
                UserName = user.UserName,
                Id = user.UserId,
                JWT = newJwtToken,
                RefreshToken = newRefreshToken
            };
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return principal;
        }
    }
}
