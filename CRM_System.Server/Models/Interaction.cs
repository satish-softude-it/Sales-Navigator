using System;
using System.Collections.Generic;

namespace CRM_System.Server.Models;

public partial class Interaction
{
    public int InteractionId { get; set; }

    public int? CustomerId { get; set; }

    public int? UserId { get; set; }

    public DateTime InteractionDate { get; set; }

    public string? InteractionType { get; set; }

    public string? Notes { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual User? User { get; set; }
}
