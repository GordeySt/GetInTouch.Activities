using System.Threading.Tasks;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> AddPhoto(AddPhoto.Command command) => await Mediator.Send(command);
    }
}