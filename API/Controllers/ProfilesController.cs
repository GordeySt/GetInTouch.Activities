using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return await Mediator.Send(new ProfileDetails.Query { UserName = username });
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username,
            string predicate)
        {
            return HandleResult(await Mediator.Send(new ProfileActivities.Query
            {
                UserName = username,
                Predicate = predicate
            }));
        }
    }
}