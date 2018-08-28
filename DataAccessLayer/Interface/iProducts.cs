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
        int InsertProducts(Products productData);
        int DeleteProduct(int ProductId);
        DataTable ViewProduct(int ProductId);
    }
}
