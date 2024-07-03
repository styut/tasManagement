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
    public class TaskFService : ITaskService
    {
        List<Taskk>? Taskkes { get; }
        private string? filePath;
        public TaskFService(IWebHostEnvironment webHost)
        {
            this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "Taskk.json");
            using (var jsonFile = File.OpenText(filePath))
            {
                Taskkes = JsonSerializer.Deserialize<List<Taskk>>(jsonFile.ReadToEnd(),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
        }

        private void saveToFile()
        {
            File.WriteAllText(filePath, JsonSerializer.Serialize(Taskkes));
        }
        public List<Taskk> GetAll(int userId) => Taskkes.FindAll(p=>p.UserId == userId);

        public Taskk Get(int id,int userId) => Taskkes.FirstOrDefault(p => p.Id == id&&p.UserId == userId); 

        public int Post(Taskk Taskk)
        {
            Taskk.Id = Taskkes.Count() + 1;
            Taskkes.Add(Taskk);
            saveToFile();
            return Taskk.Id;   
        }

        public void Delete(int id ,int userId)  
        {
            var Taskk = Get(id,userId);
            if (Taskk is null)
                return;

            Taskkes.Remove(Taskk);
            saveToFile();
        }
         public void DeleteTaskUser(int userId)  
        {

            Taskkes.RemoveAll(user=>user.UserId==userId);
            saveToFile();
        }
        

        public void Put(Taskk Taskk)
        {
            var index = Taskkes.FindIndex(p => p.Id == Taskk.Id);
            if (index == -1)
                return;
             System.Console.WriteLine("index"+ index);
             System.Console.WriteLine(Taskk.Id+"task.id"  );
            Taskkes[index] = Taskk;
            saveToFile();
        }

        public int Count => Taskkes.Count();
    }
}