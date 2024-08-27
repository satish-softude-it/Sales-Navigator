using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRM_System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CrmSystemDbContext _context;

        public CustomersController(CrmSystemDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomerList()
        {
            var customers = await _context.Customers.ToListAsync();
            return Ok(customers);
        }

        // GET: api/Customers/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Customer>> GetCustomerById(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
                return NotFound(); // Use NotFound() to indicate that the resource was not found.

            return Ok(customer);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Customer>> AddCustomer(Customer custObj)
        {
            if (custObj == null)
            {
                return BadRequest("Customer object is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Customers.Add(custObj);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCustomerById), new { id = custObj.CustomerId }, custObj);
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Database update error: {dbEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while adding the customer: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Customer>> RemoveCustomer(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            _context.Customers.Remove(customer);

            await _context.SaveChangesAsync();

            return Ok("Customer removed successfully.");
        }


    }
}
