using Back_EndFinanceTracker.DTOs;

namespace Back_EndFinanceTracker.Services
{
    public interface ITransactionService
    {
        public Task<IEnumerable<TransactionDTO>> GetAll();
        public Task<TransactionDTO> GetById(int id);
        public Task<TransactionDTO> Add(TransactionAddDTO transactionDTO);
        public Task<TransactionDTO> Update(TransactionUpdateDTO transactionDTO, int id);
        public Task<TransactionDTO> DeleteById(int id);
    }
}
