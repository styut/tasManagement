using Taskking.Models;

namespace Taskking.Interfaces;

 public interface ITaskService
  {
      List<Taskk> GetAll(int userId);
      Taskk Get(int id,int userId);
      int Post(Taskk newTaskk);      
      void Put(Taskk newTaskk);
      void Delete(int id,int userId);
      void DeleteTaskUser(int userId);

      
  }