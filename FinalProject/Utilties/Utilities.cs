using Taskking.Interfaces;
using Taskking.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Taskking.Utilities
{
    public static class Utilities
    {
        public static void AddTask(this IServiceCollection services)
        {
            services.AddSingleton<ITaskService, TaskFService>();
            services.AddSingleton<IUserService, UserService>();
        }
    }
}