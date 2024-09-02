using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace CRM_System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly CrmSystemDbContext _context;
        private readonly ILogger<ReportsController> _logger;

        public ReportsController(CrmSystemDbContext context, ILogger<ReportsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Reports 
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Report>>> GetReportList()
        {
            try
            {
                var reports = await _context.Reports.ToListAsync();
                return Ok(reports);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving the reports.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the reports.");
            }
        }

        // POST: api/Reports
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Report>> AddReports([FromBody] Report obj)
        {
            if (obj == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Reports.Add(obj);
                await _context.SaveChangesAsync();

                // Assuming the Report entity has an Id property
                return CreatedAtAction(nameof(GetReportList), new { id = obj.ReportId }, obj);
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "Database update error occurred.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the report. Please check the server logs for more details.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred. Please check the server logs for more details.");
            }
        }
    }
}
