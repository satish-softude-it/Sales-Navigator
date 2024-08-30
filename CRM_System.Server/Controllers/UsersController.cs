using BCrypt.Net;
using CRM_System.Server.DTOs;
using CRM_System.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CRM_System.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CrmSystemDbContext _crmSystem;
        private readonly IConfiguration _configuration;

        public UsersController(CrmSystemDbContext crmSystem, IConfiguration configuration)
        {
            _crmSystem = crmSystem;
            _configuration = configuration;
        }

        // Get: api/Users/userList
        [HttpGet("userList")]
        [Authorize]
        public ActionResult GetUsersList()
        {
            var userList = _crmSystem.Users.ToList();
            return Ok(userList);
        }

        [HttpGet]
        public ActionResult GetCustomerData()
        {
            var data = _crmSystem.Customers.ToList();
            return Ok(data);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (newUser == null)
            {
                return BadRequest("User data is null.");
            }

            if (await _crmSystem.Users.AnyAsync(u => u.Email == newUser.Email))
            {
                return BadRequest(new { Message = "Email already in use" });
            }

            newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newUser.PasswordHash);
            newUser.CreatedAt = DateTime.UtcNow;

            _crmSystem.Users.Add(newUser);
            await _crmSystem.SaveChangesAsync();

            return Ok(new { Message = "User added successfully", UserId = newUser.UserId });
        }


        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto registrationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _crmSystem.Users.AnyAsync(u => u.Email == registrationDto.Email))
            {
                return BadRequest(new { Message = "Email already in use" });
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registrationDto.Password);

            var user = new User
            {
                Name = registrationDto.Name,
                Email = registrationDto.Email,
                PasswordHash = hashedPassword,
                Role = registrationDto.Role,
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                _crmSystem.Users.Add(user);
                await _crmSystem.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { Message = "An error occurred while registering the user.", Details = ex.Message });
            }

            return Ok(new { Message = "User registered successfully" });
        }

        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _crmSystem.Users
                .SingleOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);

            // Create the response object
            var userResponse = new
            {
                user.UserId,
                user.Role,
                user.Email,
                user.Name,
            };

            return Ok(new
            {
                Token = token,
                User = userResponse
            });
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _crmSystem.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var userDto = new
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };

            return Ok(userDto);
        }

        // GET: api/Users/email/{email}
        [HttpGet("email/{email}")]
        [Authorize]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _crmSystem.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var userDto = new
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };

            return Ok(user);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto updateDto)
        {
            if (updateDto == null)
            {
                return BadRequest("Update data is null.");
            }

            var user = await _crmSystem.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            user.Name = updateDto.Name ?? user.Name;
            user.Email = updateDto.Email ?? user.Email;
            //user.Role = updateDto.Role ?? user.Role;

            try
            {
                _crmSystem.Users.Update(user);
                await _crmSystem.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new { Message = "User not found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = "User updated successfully" });
        }

        private bool UserExists(int id)
        {
            return _crmSystem.Users.Any(e => e.UserId == id);
        }

        // DELETE: api/User/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> RemoveUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _crmSystem.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            _crmSystem.Users.Remove(user);
            await _crmSystem.SaveChangesAsync();
            return Ok("User removed successfully.");
        }

        private string GenerateJwtToken(User user)
        {
            // Get the Jwt:Key from configuration
            var key = _configuration["Jwt:Key"];

            // Handle possible null value
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentNullException("Jwt:Key", "The JWT key is not configured.");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Role, user.Role)
    };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(120),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
