namespace Back_EndFinanceTracker.Services
{
    public interface IJwtAuthService
    {
        public string generateUserToken(string userName, int userId);
    }
}
