using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface iProducts
    {
        DataTable GetCurrency();
        DataTable GetProducts();
        int InsertUpdateProducts(Products productData);
        int DeleteProduct(int ProductId);
        DataTable ViewProduct(int ProductId);
        int OrderProduct(UserData OrderData);
        DataTable SearchProduct(SearchProducts searchItems);
        DataTable AddReviewAndRating(ReviewAndRatings ReviewsAndRatings);
        DataTable GetReviewAndRating(ReviewAndRatings ProductData);
        DataTable GetOrders();
        int RejectOrder(int OrderId);
    }
}
