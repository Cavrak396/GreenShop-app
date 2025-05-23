namespace greenshop_api.Domain.Interfaces.Modules
{
    public interface INewsletterContent
    {
        public string GenerateContent(
            string title, 
            string body);
    }
}
