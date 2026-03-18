using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Back_EndFinanceTracker.Services.imple
{
    public class TransactionService : ITransactionService
    {
        private ITransactionRepository _repository;
        private IRepository<Category> _cateRepository;
        public TransactionService(ITransactionRepository repository, IRepository<Category> repository1) 
        {
            _repository = repository;
            _cateRepository = repository1;
        }

        public async Task<TransactionDTO> Add(TransactionAddDTO transactionDTO, int userId)
        {
            var category = await _cateRepository.GetById(transactionDTO.CategoryId, userId);

            if (category == null)
            {
                return null;
            }

            var trans = new Transaction
            {
                Amount = transactionDTO.Amount,
                Description = transactionDTO.Description,
                DateTime = transactionDTO.DateTime,
                Type = transactionDTO.Type,
                CategoryId = transactionDTO.CategoryId,
                UserId = userId
            };
            
            await _repository.Add(trans);
            await _repository.Save();

            var transactionToRead = new TransactionDTO
            {
                Amount = trans.Amount,
                Description = trans.Description,
                DateTime = trans.DateTime,
                Type = trans.Type,
                CategoryId = trans.CategoryId,
                Id = trans.Id
            };

            return transactionToRead;
        }

        public async Task<TransactionDTO> DeleteById(int id, int userId)
        {
            var transaction = await _repository.GetById(id, userId);
            if (transaction == null)
            {
                return null;
            }

            _repository.Delete(transaction);
            await _repository.Save();

            var transactionDTO = new TransactionDTO
            {
                Amount = transaction.Amount,
                Description = transaction.Description,
                DateTime = transaction.DateTime,
                Type = transaction.Type,
                CategoryId = transaction.CategoryId,
                Id = transaction.Id,
            };
            return transactionDTO;
        }

        public async Task<IEnumerable<TransactionDTO>> GetAll(int userId)
        {
            var transactions = await _repository.Get(userId);
            return transactions.Select(t => new TransactionDTO
            {
                Amount = t.Amount,
                Description = t.Description,
                DateTime = t.DateTime,
                Type = t.Type,
                CategoryId = t.CategoryId,
                Id = t.Id,
            }).Reverse();
            
        }

        public async Task<TransactionDTO> GetById(int id, int userId)
        {
            var transaccion = await _repository.GetById(id, userId);
            if (transaccion == null)
            {
                return null;
            }
            var transactionDTO = new TransactionDTO
            {
                Amount = transaccion.Amount,
                Description = transaccion.Description,
                DateTime = transaccion.DateTime,
                Type = transaccion.Type,
                CategoryId = transaccion.CategoryId,
                Id = transaccion.Id,
            };
            return transactionDTO;
        }

        public async Task<TransactionDTO> Update(TransactionUpdateDTO transactionDTO, int id, int userId)
        {
            var category = await _cateRepository.GetById(transactionDTO.CategoryId, userId);

            if (category == null)
            {
                return null;
            }

            var transaction = await _repository.GetById(id, userId);
            if (transaction == null || transactionDTO.Id != id) return null;

            transaction.CategoryId = transactionDTO.CategoryId;
            transaction.Description = transactionDTO.Description;
            transaction.DateTime = transactionDTO.DateTime;
            transaction.Type = transactionDTO.Type;
            transaction.Amount = transactionDTO.Amount;

            _repository.Update(transaction);
            await _repository.Save();

            return new TransactionDTO
            {
                CategoryId = transactionDTO.CategoryId,
                Description = transactionDTO.Description,
                DateTime = transactionDTO.DateTime,
                Type = transactionDTO.Type,
                Amount = transactionDTO.Amount,
                Id = transactionDTO.Id,
            };
        }
    }
}
