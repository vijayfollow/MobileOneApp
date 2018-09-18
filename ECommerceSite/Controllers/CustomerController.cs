using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ECommerceSite.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {            
            return View();
        }
        public ActionResult ViewProduct(string productId)
        {
            ViewBag.ProductId = productId;
            return View();
        }
        public ActionResult BuyProduct(string productId)
        {
            ViewBag.ProductId = productId;
            return View();
        }
    }
}