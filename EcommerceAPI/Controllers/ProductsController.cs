using DataAccessLayer;
using DataAccessLayer.Repositories;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        public HttpResponseMessage InsertUpdateProducts()
        {
            var httpRequest = HttpContext.Current.Request;

            Products Obj = new Products();
            Obj.ProductName = httpRequest.Form["ProductName"];
            Obj.ModelName = httpRequest.Form["ModelName"];
            Obj.Price = Convert.ToInt32(httpRequest.Form["Price"]);
            Obj.CurrencyId = Convert.ToInt32(httpRequest.Form["Currency"]);
            Obj.SimType = Convert.ToInt32(httpRequest.Form["SimType"]);
            Obj.BatteryCapacity = Convert.ToInt32(httpRequest.Form["BatteryCapacity"]);
            Obj.Storage = Convert.ToInt32(httpRequest.Form["internalStorage"]);
            Obj.RAM = Convert.ToInt32(httpRequest.Form["RAM"]);
            Obj.Description = httpRequest.Form["Description"];
            Obj.ModelId = Convert.ToInt32(httpRequest.Form["ModelId"]);
            Obj.ProductId = Convert.ToInt32(httpRequest.Form["ProductId"]);
            Obj.InsertUpdateType = Convert.ToInt16(httpRequest.Form["InsertUpdateType"]);

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
            else
            {
                if(Obj.InsertUpdateType == (int)InsertUpdateType.Update)
                Obj.ImageName = httpRequest.Form["ImageName"];
            }

            int status = _iProductsRepository.InsertUpdateProducts(Obj);
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
        [HttpPost]
        public HttpResponseMessage OrderProduct(UserData orderData)
        {
            int OrderProduct = _iProductsRepository.OrderProduct(orderData);
            return Request.CreateResponse(HttpStatusCode.OK, OrderProduct);
        }

        [HttpPost]
        public HttpResponseMessage SearchProduct([FromBody]SearchProducts searchItems)
        {
            DataTable SearchProduct = _iProductsRepository.SearchProduct(searchItems);
            return Request.CreateResponse(HttpStatusCode.OK, SearchProduct);
        }

        [HttpPost]
        public HttpResponseMessage AddReviewAndRating(ReviewAndRatings ReviewsAndRatings)
        {
            DataTable ReviewRatings = _iProductsRepository.AddReviewAndRating(ReviewsAndRatings);
            return Request.CreateResponse(HttpStatusCode.OK, ReviewRatings);
        }

        [HttpPost]
        public HttpResponseMessage GetReviewAndRating(ReviewAndRatings ProductData)
        {
            DataTable ReviewRatings = _iProductsRepository.GetReviewAndRating(ProductData);
            return Request.CreateResponse(HttpStatusCode.OK, ReviewRatings);
        }

        [HttpGet]
        public HttpResponseMessage GetOrders()
        {
            DataTable Orders = _iProductsRepository.GetOrders();
            return Request.CreateResponse(HttpStatusCode.OK, Orders);
        }

        [HttpPost]
        public HttpResponseMessage RejectOrder(Products OrderData)
        {
            int Status = _iProductsRepository.RejectOrder(OrderData.OrderId);
            return Request.CreateResponse(HttpStatusCode.OK, Status);
        }
    }
}
