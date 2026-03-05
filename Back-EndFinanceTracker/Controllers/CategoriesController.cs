using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Services;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back_EndFinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private ICategoryService _categoryService;
        private IValidator<CategoryAddDTO> _validatorAdd;
        private IValidator<CategoryDto> _validatorUpdate;

        public CategoriesController(
            ICategoryService categoryService, 
            IValidator<CategoryAddDTO> validatorAdd,
            IValidator<CategoryDto> validatorUpdate)
        {
            _categoryService = categoryService;
            _validatorAdd = validatorAdd;
            _validatorUpdate = validatorUpdate;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryDto>> GetAll()
        {
            return await _categoryService.GetCategories();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id)
        {
            var category = await _categoryService.GetCategoryById(id);
            if (category == null) return NotFound();
            return Ok(category);
        }
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Add(CategoryAddDTO categoryAdd)
        {
            var result = _validatorAdd.Validate(categoryAdd);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }
            var newCategory = await _categoryService.AddCategory(categoryAdd);
            if(newCategory == null) return BadRequest();
            return Ok(newCategory);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> Update(int id, CategoryDto category)
        {

            if (category.Id != id)
            {
                return BadRequest("El ID de la categoría no coincide.");
            }

            var result = _validatorUpdate.Validate(category);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }
            
            var categoryUpdated = await _categoryService.UpdateCategory(id, category);

            if(categoryUpdated == null) return BadRequest("No se pudo actualizar la categoria");
            return Ok(categoryUpdated);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<CategoryDto>> Delete(int id)
        {
            var result = await _categoryService.DeleteCategory(id);
            if(result == null) return BadRequest();
            return Ok(result);
        }
    }
}
