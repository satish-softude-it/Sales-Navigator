using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http; // Add this for StatusCodes
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRM_System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly CrmSystemDbContext _context;

        public ReportsController(CrmSystemDbContext context)
        {
            _context = context;
        }

        // GET: api/Reports 
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Report>>> GetReportList()
        {
            var reports = await _context.Reports.ToListAsync();
            return Ok(reports);
        }

        // POST: api/Reports
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Report>> AddReports(Report obj)
        {
            if (obj == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Reports.Add(obj);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Report added successfully" });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the report. Please check the server logs for more details.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred. Please check the server logs for more details.");
            }
        }
    }
}
