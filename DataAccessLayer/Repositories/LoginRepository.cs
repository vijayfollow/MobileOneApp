using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public class LoginRepository : iLogin
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
        public int InsertRegistration(UserData userData)
        {
            int status = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.InsertUserRegistration, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserName", userData.UserName);
                cmd.Parameters.AddWithValue("@FirstName", userData.FirstName);
                cmd.Parameters.AddWithValue("@LastName", userData.LastName);
                cmd.Parameters.AddWithValue("@EmailId", userData.EMailId);
                cmd.Parameters.AddWithValue("@Password", userData.Password);
                status = Convert.ToInt16(cmd.ExecuteNonQuery());
            }
            return status;
        }

        public DataTable UserLogin(UserData loginData)
        {
            //int status = 0;
            DataTable login = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.UserLogin, conn);
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
