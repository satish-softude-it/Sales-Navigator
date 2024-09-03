using CRM_System.Server.DTOs;
using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
        public async Task<ActionResult<Customer>> GetCustomerList()
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
                return NotFound("Customer Id does not exists!");
            return Ok(customer);
        }

        // GET: api/Customers/createdBy/{createdBy}
        [HttpGet("createdBy/{createdBy}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersByCreatedBy(int createdBy)
        {
            var customers = await _context.Customers
                .Where(c => c.CreatedBy == createdBy)
                .ToListAsync();

            if (customers == null || customers.Count == 0)
                return NotFound("No customers found for the given user ID!");

            return Ok(customers);
        }


        // POST: api/Customers
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Customer>> AddCustomer(Customer custObj)
        {
            if (custObj == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Customers.Add(custObj);

                await _context.SaveChangesAsync();

                return Ok(new { Message = "User registered successfully" });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the customer. Please check the server logs for more details.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred. Please check the server logs for more details.");
            }

        }

        // PUT: api/Customers/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Customer>> UpdateCustomer(int id, Customer custObj)
        {
            if (id != custObj.CustomerId)
            {
                return BadRequest("Customer ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(custObj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound($"Customer with ID {id} not found.");
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while updating the customer: {ex.Message}");
            }
            var updatedCustomer = await _context.Customers.FindAsync(id);
            return Ok(updatedCustomer);
        }

        //// DELETE: api/Customers/{id}
        //[HttpDelete("{id}")]
        //[Authorize]
        //public async Task<ActionResult<Customer>> RemoveCustomer(int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var customer = await _context.Customers.FindAsync(id);
        //    if (customer == null)
        //    {
        //        return NotFound("Customer not found.");
        //    }
        //    _context.Customers.Remove(customer);
        //    await _context.SaveChangesAsync();
        //    return Ok("Customer removed successfully.");
        //}


        // DELETE: api/Customers/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> RemoveCustomer(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers
                //.Include(c => c.Report) // Assuming navigation properties exist
                .Include(c => c.Interactions)
                .FirstOrDefaultAsync(c => c.CustomerId == id);

            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            // Remove related records in Report and Interaction tables
            //_context.Reports.RemoveRange(customer.Reports);
            _context.Interactions.RemoveRange(customer.Interactions);

            // Remove the customer record
            _context.Customers.Remove(customer);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Handle potential exceptions related to database operations
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while deleting the customer: {ex.Message}");
            }

            return Ok("Customer and associated records removed successfully.");
        }


        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }

        // GET: api/Customers/distribution
        // ChartJS
        [HttpGet("distribution")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CustomerDistributionByStateDto>>> GetCustomerDistribution()
        {
            var customerDistribution = await _context.Customers
                .GroupBy(c => c.State)
                .Select(g => new CustomerDistributionByStateDto
                {
                    State = g.Key,
                    TotalCustomers = g.Count()
                })
                .ToListAsync();

            return Ok(customerDistribution);
        }

    }
}