using DataAccessLayer;
using DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EcommerceAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductsController : ApiController
    {
        iProducts _iProductsRepository = new ProductsRepository();

        [HttpPost]
        public HttpResponseMessage AddProducts()
        {
            var httpRequest = HttpContext.Current.Request;

            Products Obj = new Products();
            Obj.ProductName = httpRequest.Form["ProductName"];
            Obj.ModelName = httpRequest.Form["ModelName"];
            Obj.Price = Convert.ToInt32(httpRequest.Form["Price"]);
            Obj.CurrencyId = Convert.ToInt32(httpRequest.Form["Currency"]);
            Obj.SimType = Convert.ToInt32(httpRequest.Form["SimType"]);
            Obj.BatteryCapacity = Convert.ToInt32(httpRequest.Form["BatteryCapacity"]);
            Obj.RAM = Convert.ToInt32(httpRequest.Form["RAM"]);
            Obj.Description = httpRequest.Form["Description"];

            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    Obj.ImageName = postedFile.FileName;
                    var filePath = HttpContext.Current.Server.MapPath("~/Content//ProductImages//" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }

            int status = _iProductsRepository.InsertProducts(Obj);
            return Request.CreateResponse(HttpStatusCode.OK, status);
        }

        [HttpGet]
        public HttpResponseMessage GetProducts()
        {
            DataTable Products = _iProductsRepository.GetProducts();
            return Request.CreateResponse(HttpStatusCode.OK, Products);
        }

        [HttpPost]
        public HttpResponseMessage DeleteProduct(Products ProductData)
        {
            int Status = _iProductsRepository.DeleteProduct(ProductData.ProductId);
            return Request.CreateResponse(HttpStatusCode.OK, Status);
        }

        [HttpGet]
        public HttpResponseMessage GetCurrency()
        {
            DataTable Currency = _iProductsRepository.GetCurrency();
            return Request.CreateResponse(HttpStatusCode.OK, Currency);
        }
        [HttpPost]
        public HttpResponseMessage ViewProduct(Products ProductData)
        {
            DataTable ViewProduct = _iProductsRepository.ViewProduct(ProductData.ProductId);
            return Request.CreateResponse(HttpStatusCode.OK, ViewProduct);
        }

        //GetCurrency
        //int InsertProducts(Products productData);
    }
}
