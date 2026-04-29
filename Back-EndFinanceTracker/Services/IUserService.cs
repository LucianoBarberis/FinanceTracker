using Back_EndFinanceTracker.DTOs;

namespace Back_EndFinanceTracker.Services
{
    public interface IUserService
    {
        public Task<UserDTO> Login(LoginDTO loginDTO);
        public Task<UserDTO> Register(RegisterDTO registerDTO);
        public Task<UserDTO> DeleteUser(int UserId);
        public Task<UserDTO> UpdateUser(int  UserId, RegisterDTO DTO);
        public Task<UserDTO> RefreshToken(RefreshTokenDTO refreshTokenDTO);
    }
}
