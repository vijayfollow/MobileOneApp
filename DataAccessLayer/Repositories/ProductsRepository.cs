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
    public class ProductsRepository : iProducts
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;

        public DataTable GetCurrency()
        {
            DataTable Currency = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.GetCurrency, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(Currency);
            }
            return Currency;
        }
        public DataTable GetProducts()
        {
            DataTable Products = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.GetProducts, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(Products);
            }
            return Products;
        }
        public int InsertProducts(Products productData)
        {
            int status = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.InsertProducts, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@UserId", productData.UserId);
                cmd.Parameters.AddWithValue("@UserId", 1);
                cmd.Parameters.AddWithValue("@ProductName", productData.ProductName);
                cmd.Parameters.AddWithValue("@ModelName", productData.ModelName);
                cmd.Parameters.AddWithValue("@ImageName", productData.ImageName);
                cmd.Parameters.AddWithValue("@Price", productData.Price);
                cmd.Parameters.AddWithValue("@CurrencyId", productData.CurrencyId);
                cmd.Parameters.AddWithValue("@SimType", productData.SimType);
                cmd.Parameters.AddWithValue("@RAM", productData.RAM);
                cmd.Parameters.AddWithValue("@BatteryCapacity", productData.BatteryCapacity);
                cmd.Parameters.AddWithValue("@Description", productData.Description);

                status = Convert.ToInt16(cmd.ExecuteNonQuery());
            }
            return status;
        }

        public int DeleteProduct(int ProductId)
        {
            int status = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.DeleteProduct, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", 1);
                cmd.Parameters.AddWithValue("@ProductId", ProductId);
                status = Convert.ToInt16(cmd.ExecuteNonQuery());
            }
            return status;
        }

        public DataTable ViewProduct(int ProductId)
        {
            DataTable ViewProduct = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.ViewProduct, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@UserId", 1);
                cmd.Parameters.AddWithValue("@ProductId", ProductId);
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(ViewProduct);
            }
            return ViewProduct;
        }
        //ViewProduct
    }
}
