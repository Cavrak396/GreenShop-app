namespace greenshop_api.Domain.Interfaces.Services
{
    public interface IPermissionControlService
    {
        bool VerifyApplication(string applicationKey);
        bool VerifyAdmin(string adminKey);
    }
}
