using Employee.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly EmployeeService _employeeService;
        public EmployeeController(ILogger<EmployeeController> logger, EmployeeService employeeService)
        {
            _logger = logger;
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployeesAsync([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 4)        
        {
            try
            {
                return Ok(await _employeeService.GetEmployeesAsync(pageNumber, pageSize));
            }
            catch (Exception ex)
            {
                var errorMessage = $"Error occurred while retrieving employee list for page number: {pageNumber}, page size: {pageSize}";
                _logger.LogError(ex, errorMessage);
                return BadRequest(errorMessage);
            }
        }
    }
}
