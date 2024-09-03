namespace CRM_System.Server.DTOs
{
    public class MonthlyInteractionReportDto
    {
        public string Month { get; set; }
        public string InteractionType { get; set; }
        public int TotalInteractions { get; set; }
    }
}
