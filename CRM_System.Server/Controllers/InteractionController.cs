using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CRM_System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteractionController : ControllerBase
    {
        private readonly CrmSystemDbContext _context;

        public InteractionController(CrmSystemDbContext context)
        {
            _context = context;
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
            // Validate input
            if (userId <= 0)
            {
                return BadRequest("Invalid userId");
            }

            // Retrieve interactions from the database
            var interactions = await _context.Interactions
                                              .Where(i => i.UserId == userId)
                                              .ToListAsync();

            // Check if any interactions were found
            if (interactions == null || interactions.Count == 0)
            {
                return NotFound($"No interactions found for userId {userId}");
            }

            // Return the interactions
            return Ok(interactions);
        }

        // GET: api/Customers/createdBy/{createdBy}
        [HttpGet("createdBy/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Interaction>>> GetCustomersByCreatedBy(int userId)
        {
            var interaction = await _context.Interactions
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (interaction == null || interaction.Count == 0)
                return NotFound("No Interaction found for the given user ID!");

            return Ok(interaction);
        }
    }
}
