using System.Threading.Tasks;
using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username) => HandleResult(await Mediator.Send(new FollowToggle.Command
        {
            TargetName = username
        }));

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new FollowList.Query
            {
                UserName = username,
                Predicate = predicate
            }));
        }
    }
}