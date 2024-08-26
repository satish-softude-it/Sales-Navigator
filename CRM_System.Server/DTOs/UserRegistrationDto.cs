using System.ComponentModel.DataAnnotations;

namespace CRM_System.Server.DTOs
{
    public class UserRegistrationDto
    {
        public string Name { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
    // Data Anotation [Required]
}
