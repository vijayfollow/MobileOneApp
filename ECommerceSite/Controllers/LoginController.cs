using System;
using System.Web.Mvc;
using System.Web.Security;

namespace ECommerceSite.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UserLogin()
        {
            Session["UserName"] = Request.QueryString["UserName"];
            Session["IsAdmin"] = Request.QueryString["IsAdmin"];
            FormsAuthentication.SetAuthCookie(Convert.ToString(Session["UserName"]), true);

            if (Convert.ToBoolean(Session["IsAdmin"]))
                return RedirectToAction("Index", "Admin");
            else
                return RedirectToAction("Index", "Customer");
        }

        public ActionResult UserRegistration()
        {
            return View();
        }

        //public JsonResult UserLogin(UserData loginData)
        //{
        //    //UserData obj = new UserData();
        //    //obj.UserName=user
        //    LoginRepository loginObj = new LoginRepository();
        //    DataTable dt = loginObj.UserLogin(loginData);
        //    List<UserData> lstObj = new List<UserData>();
        //    if (dt != null)
        //    {
        //        if (dt.Rows.Count > 0)
        //        {
        //            UserData obj = new UserData();
        //            obj.UserName = Convert.ToString(dt.Rows[0]["UserName"].ToString());
        //            Session["UserName"] = Convert.ToString(dt.Rows[0]["UserName"].ToString());
        //            obj.IsAdmin = Convert.ToInt32(dt.Rows[0]["IsAdmin"]);
        //            Session["IsAdmin"] = Convert.ToInt32(dt.Rows[0]["IsAdmin"]);
        //            FormsAuthentication.SetAuthCookie(obj.UserName, true);
        //            lstObj.Add(obj);
        //        }
        //    }
        //    return Json(lstObj, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            //Session.Clear();
            //Session.RemoveAll();
            //Session.Abandon();
            return RedirectToAction("Index", "Login");
        }

    }
}