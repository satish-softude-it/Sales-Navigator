using CRM_System.Server.DTOs;
using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
namespace CRM_System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteractionController : ControllerBase
    {
        private readonly CrmSystemDbContext _context;
        private readonly ILogger<InteractionController> _logger;

        public InteractionController(CrmSystemDbContext context, ILogger<InteractionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Interaction>> AddInteraction(Interaction interactionObj)
        {
            if (interactionObj == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Interactions.Add(interactionObj);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddInteraction), new { id = interactionObj.InteractionId }, new { Message = "Interaction details added successfully", Interaction = interactionObj });
        }

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Interaction>>> GetInteractionsByUserId(int userId)
        {
            if (userId <= 0)
            {
                return BadRequest("Invalid userId");
            }

            var interactions = await _context.Interactions
                                              .Where(i => i.UserId == userId)
                                              .ToListAsync();

            if (interactions == null || interactions.Count == 0)
            {
                return NotFound($"No interactions found for userId {userId}");
            }

            return Ok(interactions);
        }

        // GET: api/Interactions/createdBy/{userId}
        [HttpGet("createdBy/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Interaction>>> GetInteractionsByCreatedBy(int userId)
        {
            var interactions = await _context.Interactions
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (interactions == null || interactions.Count == 0)
                return NotFound("No Interaction found for the given user ID!");

            return Ok(interactions);
        }

        [HttpGet("report")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MonthlyInteractionReportDto>>> GetMonthlyInteractionReport()
        {
            try
            {
                // Fetch all interactions from the database
                var interactions = await _context.Interactions
                    .ToListAsync();

                // Perform grouping and formatting in-memory
                var report = interactions
                    .GroupBy(i => new
                    {
                        Year = i.InteractionDate.Year,
                        Month = i.InteractionDate.Month,
                        i.InteractionType
                    })
                    .Select(g => new MonthlyInteractionReportDto
                    {
                        Month = $"{g.Key.Year}-{g.Key.Month:D2}",
                        InteractionType = g.Key.InteractionType,
                        TotalInteractions = g.Count()
                    })
                    .OrderBy(r => r.Month)
                    .ToList();

                return Ok(report);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving the monthly interaction report.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the report.");
            }
        }





    }
}
