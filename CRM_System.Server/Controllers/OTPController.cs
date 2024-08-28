using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("api/[controller]")]
public class OTPController : ControllerBase
{
    private readonly ILogger<OTPController> _logger;
    private static readonly Dictionary<string, OTPData> _OTPStore = new Dictionary<string, OTPData>();

    public OTPController(ILogger<OTPController> logger)
    {
        _logger = logger;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendOTP([FromBody] SendOTPRequest request)
    {
        if (!IsValidEmail(request.Email))
        {
            return BadRequest("Invalid email address");
        }

        string OTP = GenerateOTP();
        _OTPStore[request.Email] = new OTPData { OTP = OTP, ExpiresAt = DateTime.UtcNow.AddMinutes(15) };

        try
        {
            await SendOTPEmail(request.Email, OTP);
            return Ok(new { message = "OTP sent successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send OTP email");
            return StatusCode(500, "Failed to send OTP");
        }
    }

    [HttpPost("verify")]
    public IActionResult VerifyOTP([FromBody] VerifyOTPRequest request)
    {
        if (!_OTPStore.TryGetValue(request.Email, out var OTPData))
        {
            return BadRequest("No OTP found for this email");
        }

        if (DateTime.UtcNow > OTPData.ExpiresAt)
        {
            _OTPStore.Remove(request.Email);
            return BadRequest("OTP has expired");
        }

        if (OTPData.OTP != request.OTP)
        {
            return BadRequest("Invalid OTP");
        }

        _OTPStore.Remove(request.Email);
        return Ok(new { message = "OTP verified successfully" });
    }

    private string GenerateOTP()
    {
        return new Random().Next(100000, 999999).ToString();
    }

    private async Task SendOTPEmail(string email, string OTP)
    {
        using (var smtpClient = new SmtpClient("your_smtp_server"))
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress("noreply@yourcompany.com"),
                Subject = "Your OTP for Password Reset",
                Body = $"Your OTP is: {OTP}. It will expire in 15 minutes.",
                IsBodyHtml = false,
            };
            mailMessage.To.Add(email);

            await smtpClient.SendMailAsync(mailMessage);
        }
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}

public class SendOTPRequest
{
    public string Email { get; set; }
}

public class VerifyOTPRequest
{
    public string Email { get; set; }
    public string OTP { get; set; }
}

public class OTPData
{
    public string OTP { get; set; }
    public DateTime ExpiresAt { get; set; }
}