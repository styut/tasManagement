using Taskking.Models;
using Taskking.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;

namespace Taskking.Services
{
    public class UserService : IUserService
    {
        List<User>? Users { get; }
        private string? filePath;
    // public UserService(IWebHostEnvironment webHost)
    //     {
    //         this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "User.json");
    //         using (var jsonFile = File.OpenText(filePath))
    //         {
    //             Users = JsonSerializer.Deserialize<List<User>>(jsonFile.ReadToEnd(),
    //             new JsonSerializerOptions
    //             {
    //                 PropertyNameCaseInsensitive = true
    //             });
    //         }
    //     }
  private readonly ITaskService taskService;

        public UserService(IWebHostEnvironment webHost, ITaskService taskService)
        {
            this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "User.json");
            using (var jsonFile = File.OpenText(filePath))
            {
                Users = JsonSerializer.Deserialize<List<User>>(jsonFile.ReadToEnd(),
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
            }
            this.taskService = taskService;
        }
        private void saveToFile()
        {
            File.WriteAllText(filePath, JsonSerializer.Serialize(Users));
        }
        public List<User> GetAll() => Users;

       

        public int Post(User User)
        {
            User.Id = Users.Count() + 1;
            Users.Add(User);
            saveToFile();
            return User.Id;   
        }
        
        public void Put(User User,int userId)
        {
            var index = Users.FindIndex(p => p.Id == userId);
            if (index == -1)
                return;
            User.Type=Users[index].Type;    
            Users[index] = User;
            saveToFile();
        }
         
        public void Delete(int id)
        {
            var User = Users.FirstOrDefault(p => p.Id == id);
            if (User is null)
                return;
            taskService.DeleteTaskUser(id);
            Users.Remove(User);
            saveToFile();
        }


        public int Count => Users.Count();
    }
}