using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Services;
using Microsoft.Extensions.Options;

namespace greenshop_api.Infrastructure.Services
{
    public class PermissionControlService(IOptions<PermissionControlOptions> permissionControlOptions) 
        : IPermissionControlService
    {
        private readonly PermissionControlOptions _permissionControlOptions = 
            permissionControlOptions.Value;
        public bool VerifyApplication(string applicationKey)
        {
            if(applicationKey == 
                _permissionControlOptions.ApplicationKey)
            {
                return true;
            }
            return false;
        }

        public bool VerifyAdmin(string adminKey)
        {
            if (adminKey == 
                _permissionControlOptions.AdminKey)
            {
                return true;
            }
            return false;
        }
    }
}
