using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using BC = BCrypt.Net.BCrypt;

namespace Back_EndFinanceTracker.Services.imple
{
    public class UserService : IUserService
    {
        private IUserRepository _repository;
        private IJwtAuthService _jwtAuthService;
        public UserService(IUserRepository repository, IJwtAuthService jwtAuthService)
        {
            _repository = repository;
            _jwtAuthService = jwtAuthService;
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
            return new UserDTO
            {
                Email = user.Email,
                UserName = user.UserName,
                Id = user.UserId,
                JWT = _jwtAuthService.generateUserToken(user.UserName, user.UserId)
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

            await _repository.Add(userToAdd);
            await _repository.Save();

            return new UserDTO
            {
                Email = registerDTO.Email,
                UserName = registerDTO.UserName,
                Id = userToAdd.UserId,
                JWT = _jwtAuthService.generateUserToken(registerDTO.UserName, userToAdd.UserId)
            };
        }

        public Task<UserDTO> UpdateUser(int UserId, RegisterDTO DTO)
        {
            throw new NotImplementedException();
        }
    }
}
