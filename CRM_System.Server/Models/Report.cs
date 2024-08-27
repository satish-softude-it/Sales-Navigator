using System;
using System.Collections.Generic;

namespace CRM_System.Server.Models;

public partial class Report
{
    public int ReportId { get; set; }

    public int? UserId { get; set; }

    public string ReportType { get; set; } = null!;

    public string? ReportData { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? User { get; set; }
}
