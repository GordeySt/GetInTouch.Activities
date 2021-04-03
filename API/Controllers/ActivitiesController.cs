using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.Activities.Commands;
using Domain;
using Application.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery] PagingParams param) =>
            HandlePagedResult(await Mediator.Send(new ActivitiesList.Query { Params = param }));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id) => HandleResult(await Mediator.Send(new ActivityDetails.Query { Id = id }));


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) => HandleResult(await Mediator.Send(new CreateActivity.Command
        {
            Activity = activity
        }));

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> DeleteActivity(Guid id) => HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));

        [HttpPost("{id}/cancel")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> CancelActivity(Guid id) => HandleResult(await Mediator.Send(new CancelActivity.Command { Id = id }));

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> AttendActivity(Guid id) => HandleResult(await Mediator.Send(new AttendActivity.Command { Id = id }));

        [HttpDelete("{id}/attend")]
        public async Task<IActionResult> UnattendActivity(Guid id) => HandleResult(await Mediator.Send(new UnattendActivity.Command { Id = id }));
    }
}