namespace greenshop_api.Domain.Interfaces.Newsletter
{
    public interface INewsletterContent
    {
        public string GenerateContent(string title, string body);
    }
}
