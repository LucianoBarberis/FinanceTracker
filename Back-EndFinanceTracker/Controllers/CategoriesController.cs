using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace Back_EndFinanceTracker.Controllers
{
    [Authorize]
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

        private int? GetUserId()
        {
            var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            return claim != null ? int.Parse(claim.Value) : null;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            return Ok(await _categoryService.GetCategories(userId.Value));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var category = await _categoryService.GetCategoryById(id, userId.Value);
            if (category == null) return NotFound();
            return Ok(category);
        }
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Add(CategoryAddDTO categoryAdd)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var result = await _validatorAdd.ValidateAsync(categoryAdd);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }
            var newCategory = await _categoryService.AddCategory(categoryAdd, userId.Value);
            if(newCategory == null) return BadRequest();
            return Ok(newCategory);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> Update(int id, CategoryDto category)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            if (category.Id != id)
            {
                return BadRequest("El ID de la categoría no coincide.");
            }

            var result = _validatorUpdate.Validate(category);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }
            
            var categoryUpdated = await _categoryService.UpdateCategory(id, category, userId.Value);

            if(categoryUpdated == null) return BadRequest("No se pudo actualizar la categoria");
            return Ok(categoryUpdated);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<CategoryDto>> Delete(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();
            var result = await _categoryService.DeleteCategory(id, userId.Value);
            if(result == null) return BadRequest();
            return Ok(result);
        }
    }
}
