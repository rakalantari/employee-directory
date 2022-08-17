using System.Net.Http.Headers;
using System.Text.Json;

namespace Employee.Core
{
    public class EmployeeService : ServiceBase
    {
        private const string _baseAddress = "https://reqres.in/";
        public EmployeeService(HttpClient httpClient) : base(httpClient)
        {
            HttpClient.BaseAddress = new Uri(_baseAddress);
            HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<EmployeeResponse> GetEmployeesAsync(int pageNumber, int pageSize)
        {
            string requestUri = $"api/users?page={pageNumber}&per_page={pageSize}";

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, requestUri);

            var response = await HttpClient.SendAsync(httpRequestMessage);

            var jsonEmployeeResponse = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<EmployeeResponse>(jsonEmployeeResponse) ?? new EmployeeResponse();
        }
    }
}
