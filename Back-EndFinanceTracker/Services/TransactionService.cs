using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Back_EndFinanceTracker.Services
{
    public class TransactionService : ITrasactionService
    {
        private IRepository<Transaction> _repository;
        public TransactionService(IRepository<Transaction> repository) 
        {
            _repository = repository;
        }

        public async Task<TransactionDTO> Add(TransactionAddDTO transactionDTO)
        {
            var category = await _repository.GetCategoryById(transactionDTO.CategoryId);

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
            };
            
            await _repository.Add(trans);
            await _repository.Save();

            var transactionToRead = new TransactionDTO
            {
                Amount = transactionDTO.Amount,
                Description = transactionDTO.Description,
                DateTime = transactionDTO.DateTime,
                Type = transactionDTO.Type,
                CategoryId = transactionDTO.CategoryId,
                Id = trans.Id
            };

            return transactionToRead;
        }

        public async Task<TransactionDTO> DeleteById(int id)
        {
            var transaction = await _repository.GetById(id);
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

        public async Task<IEnumerable<TransactionDTO>> GetAll()
        {
            var transactions = await _repository.Get();
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

        public async Task<TransactionDTO> GetById(int id)
        {
            var transaccion = await _repository.GetById(id);
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

        public async Task<TransactionDTO> Update(TransactionUpdateDTO transactionDTO, int id)
        {
            // Refactorizar: Validar
            var category = await _repository.GetCategoryById(transactionDTO.CategoryId);

            if (category == null)
            {
                return null;
            }

            var transaction = await _repository.GetById(id);
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
