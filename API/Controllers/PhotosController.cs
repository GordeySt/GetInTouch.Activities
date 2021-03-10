using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] AddPhoto.Command command) => await Mediator.Send(command);

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeletePhoto(string id) => await Mediator.Send(new DeletePhoto.Command { ImageId = id });

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id) => await Mediator.Send(new SetMainPhoto.Command { Id = id });
    }
}