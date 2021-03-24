using System.Net;
using Application.Errors;
using Application.Interfaces;
using Domain;

namespace Infrastructure.Common
{
    public class Checking : IChecking
    {
        public void checkIfActivityNotFound(Activity activity)
        {
            if (activity == null) 
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not Found"
                    });
        }
    }
}