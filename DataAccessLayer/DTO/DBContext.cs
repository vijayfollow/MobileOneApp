using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DataAccessLayer
{
    public abstract class DBContext
    {
        private readonly string _connectionString;

        public DBContext()
        {
            _connectionString = ConfigurationManager.ConnectionStrings["connString"].ConnectionString;
        }

        protected SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}