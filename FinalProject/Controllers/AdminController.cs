using System;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Taskking.Interfaces;
using Taskking.Models;


namespace Taskking.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "User")]
    public class UserController : ControllerBase

    {
    readonly IUserService UserService;
    public int userId;

   public UserController(IUserService UserService, IHttpContextAccessor httpContextAccessor)
        {
            this.UserService = UserService;
            userId = int.Parse(httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value, CultureInfo.InvariantCulture);
        }
//to get all users - only admin
    [HttpGet]
    [Authorize(Policy = "Admin")]
    public ActionResult<IEnumerable<User>> Get()
    {
        return UserService.GetAll();
    }

 
    [HttpPost]
    [Authorize(Policy = "Admin")]
    public IActionResult Post(User newUser)
    {
        var newId = UserService.Post(newUser);
        return CreatedAtAction(nameof(Post), new { id = newId }, newUser);
    }
    [HttpPut]
     public ActionResult Put( User newUser)
    {
         UserService.Put(newUser,userId);
        return Ok();
    }
  

    [HttpDelete("{id}")]
    [Authorize(Policy = "Admin")]
    public ActionResult Delete(int id)
    {

        UserService.Delete(id);
        return Ok();
    }
       [HttpGet]
        [Route("/Admin")]
        [Authorize(Policy = "Admin")]
        public ActionResult<string> IsAdmin()
        {
            return new OkObjectResult("true");
        }

    }
}
