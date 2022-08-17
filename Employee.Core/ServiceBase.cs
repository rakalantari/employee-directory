namespace Employee.Core
{
    public abstract class ServiceBase : IHttpService
    {
        public HttpClient HttpClient { get; private set; }
        public ServiceBase(HttpClient httpClient)
        {
            HttpClient = httpClient;
        }
    }
}
