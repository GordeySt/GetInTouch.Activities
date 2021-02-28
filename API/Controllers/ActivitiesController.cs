using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> ActivitiesList() => await Mediator.Send(new ActivitiesList.Query());

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ActivityDto>> Details(Guid id) => await Mediator.Send(new ActivitiesDetails.Query(id));

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(CreateActivity.Command command) => await Mediator.Send(command);

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditActivity.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) => await Mediator.Send(new DeleteActivity.Command(id));
    }
}