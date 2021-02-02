using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> ActivitiesList() => await _mediator.Send(new ActivitiesList.Query());

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id) => await _mediator.Send(new ActivitiesDetails.Query(id));

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(CreateActivity.Command command) => await _mediator.Send(command);

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditActivity.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) => await _mediator.Send(new DeleteActivity.Command(id));
    }
}