﻿using CRM_System.Server.Models;
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

        // DELETE: api/Customers/{id}
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

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}