using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
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
        public int InsertUpdateProducts(Products productData)
        {
            int status = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.InsertUpdateProducts, conn);
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
                cmd.Parameters.AddWithValue("@InternalStorage", productData.Storage);
                cmd.Parameters.AddWithValue("@Description", productData.Description);
                cmd.Parameters.AddWithValue("@InsertUpdateType", productData.InsertUpdateType);
                cmd.Parameters.AddWithValue("@ProductId", productData.ProductId);
                cmd.Parameters.AddWithValue("@ModelId", productData.ModelId);

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

        public int OrderProduct(UserData orderData)
        {
            int status = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.OrderProduct, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", 1);
                cmd.Parameters.AddWithValue("@ProductId", orderData.ProductId);
                cmd.Parameters.AddWithValue("@FirstName", orderData.FirstName);
                cmd.Parameters.AddWithValue("@LastName", orderData.LastName);
                cmd.Parameters.AddWithValue("@EMailId", orderData.EMailId);
                cmd.Parameters.AddWithValue("@MobileNo", orderData.MobileNo);
                cmd.Parameters.AddWithValue("@Address", orderData.Address);
                cmd.Parameters.AddWithValue("@CountryName", orderData.CountryName);
                cmd.Parameters.AddWithValue("@StateName", orderData.StateName);
                cmd.Parameters.AddWithValue("@CityName", orderData.CityName);
                status = Convert.ToInt16(cmd.ExecuteNonQuery());
            }
            return status;
        }

        public DataTable SearchProduct(SearchProducts searchItems)
        {
            ListToDataTable converter = new ListToDataTable();

            DataTable ProductNames = converter.ToDataTable(searchItems.ProductNames);
            DataTable SearchProduct = new DataTable();
            //string ProductName = string.Join(",", searchItems.ProductNames);
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.SearchProducts, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProductNames", ProductNames);
                cmd.Parameters.AddWithValue("@MinValue", searchItems.MinValue);
                cmd.Parameters.AddWithValue("@MaxValue", searchItems.MaxValue);
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(SearchProduct);
            }
            return SearchProduct;
        }
        public DataTable AddReviewAndRating(ReviewAndRatings ReviewsAndRatings)
        {
            DataTable ReviewAndRating = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.AddReviewAndRatings, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@ProductId", ReviewsAndRatings.ProductId);
                cmd.Parameters.AddWithValue("@Ratings", ReviewsAndRatings.Ratings);
                cmd.Parameters.AddWithValue("@Comments", ReviewsAndRatings.Comments);
                cmd.Parameters.AddWithValue("@UserId", 1);
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(ReviewAndRating);
            }
            return ReviewAndRating;
        }
        public DataTable GetReviewAndRating(ReviewAndRatings ProductData)
        {
            DataTable ReviewAndRating = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.GetReviewAndRatings, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@ProductId", ProductData.ProductId);
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(ReviewAndRating);
            }
            return ReviewAndRating;
        }
        public DataTable GetOrders()
        {
            DataTable Orders = new DataTable();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.GetOrders, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(Orders);
            }
            return Orders;
        }
        public int RejectOrder(int OrderId)
        {
            int status = 0;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(Common.StoreProcedure.RejectOrder, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@OrderId", OrderId);
                status = Convert.ToInt16(cmd.ExecuteNonQuery());
            }
            return status;
        }

        //RejectOrder
    }
}
