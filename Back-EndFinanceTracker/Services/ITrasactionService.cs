using Back_EndFinanceTracker.DTOs;

namespace Back_EndFinanceTracker.Services
{
    public interface ITransactionService
    {
        public Task<IEnumerable<TransactionDTO>> GetAll(int userId);
        public Task<TransactionDTO> GetById(int id, int userId);
        public Task<TransactionResponseDTO> Add(TransactionAddDTO transactionDTO, int userId);
        public Task<TransactionDTO> Update(TransactionUpdateDTO transactionDTO, int id, int userId);
        public Task<TransactionDTO> DeleteById(int id, int userId);
    }
}
