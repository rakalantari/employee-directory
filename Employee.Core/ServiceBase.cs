using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee.Core
{
    public class ServiceBase : IHttpService
    {
        public HttpClient HttpClient { get; private set; }
        public ServiceBase(HttpClient httpClient)
        {
            HttpClient = httpClient;
        }
    }
}
