using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EcommerceAPI.Controllers
{
    public abstract class BaseController : ApiController
    {
        private readonly string _connectionString;
        public BaseController()
        {
            _connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
        }
        protected SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
