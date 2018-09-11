using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ECommerceSite.Models
{
    public class Login
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
        public DataTable UserLogin(UserData loginData)
        {
            //int status = 0;
            DataTable login = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(DataAccessLayer.Common.StoreProcedure.UserLogin, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserName", loginData.UserName);
                cmd.Parameters.AddWithValue("@Password", loginData.Password);
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(login);
            }
            return login;
        }

    }
}