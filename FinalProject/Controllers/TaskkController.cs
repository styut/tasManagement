using Microsoft.AspNetCore.Mvc;
using Taskking.Models;
using System.Collections.Generic;
using System.Linq;
using Taskking.Interfaces;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;

namespace Taskking.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class TaskkController : ControllerBase
{
    readonly int userId;
    public ITaskService TaskService;
        public TaskkController(ITaskService TaskService, IHttpContextAccessor httpContextAccessor)
        {
            this.TaskService = TaskService;
            userId = int.Parse(httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value, CultureInfo.InvariantCulture);
        }
    [HttpGet]
    public ActionResult<IEnumerable<Taskk>> Get()
    {
        return TaskService.GetAll(userId);
    }

    [HttpGet("{id}")]
    public ActionResult<Taskk> Get(int id)
    {
        var Task = TaskService.Get(id, userId);
        if (Task == null)
            return NotFound();
        return Ok(Task);
    }


    [HttpPost]
    public IActionResult Post(Taskk newTaskk)
    {
        newTaskk.UserId = userId;
        var newId = TaskService.Post(newTaskk);
        return CreatedAtAction(nameof(Post), new { id = newId }, newTaskk);
    }

 [HttpPut("{id}")]
public ActionResult Put(int id,Taskk newTaskk)
{   
    System.Console.WriteLine(id);
    newTaskk.Id = id;
    TaskService.Put(newTaskk);
    return Ok();
}




[HttpDelete("{id}")]
public ActionResult Delete(int id)
{

    TaskService.Delete(id, userId);
    return Ok();
}

[HttpDelete]
[Authorize(Policy = "Admin")]
public ActionResult DeleteTaskUser(int UserId)
{
    TaskService.DeleteTaskUser(UserId);
    return Ok();
}
}


