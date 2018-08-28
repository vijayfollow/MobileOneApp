var APIurl = "";

var check = "";

var Home = {
    GetApi: "/Home/GetApiURL"
}
var APISiteUrl = "http://localhost:51984/";

var APIUrl = APISiteUrl + "api/";

var Controller = {
    Login: "Login/",
    Products: "Products/"
}

var LoginURL = {
    InsertRegistration: APIUrl + Controller.Login + "InsertRegistration",
    UserLogin: APIUrl + Controller.Login + "UserLogin"
};

var ProductsURL = {
    AddProducts: APIUrl + Controller.Products + "AddProducts",
    GetProducts: APIUrl + Controller.Products + "GetProducts",
    GetCurrency: APIUrl + Controller.Products + "GetCurrency",
    DeleteProduct: APIUrl + Controller.Products + "DeleteProduct",
    ViewProduct: APIUrl + Controller.Products + "ViewProduct"
    //DeleteProduct
}

var ImgPath = APISiteUrl + "Content/ProductImages/";



function GetProducts(CallBack) {
    //tblProducts
    $.ajax({
        url: ProductsURL.GetProducts,
        type: 'Get',
        dataType: 'json',
        success: function (data) {
            debugger;
            CallBack(data);
        }, error: function (err) {
            alert(err);
        }
    });
}


function DescriptionToFixed(desc) {
    var description = (desc.length >= 25) ? desc.substring(0, 25) + '..' : desc;
    return description;
}