using System.Security.Cryptography;
using System.Text;

namespace Back_EndFinanceTracker.Security
{
    public static class TokenHasher
    {
        public static string Hash(string token)
        {
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
            return Convert.ToHexString(bytes);
        }

        public static bool Verify(string token, string storedHash)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(storedHash)) return false;
            var tokenHash = Hash(token);
            return CryptographicOperations.FixedTimeEquals(
                Encoding.UTF8.GetBytes(tokenHash),
                Encoding.UTF8.GetBytes(storedHash));
        }
    }
}
