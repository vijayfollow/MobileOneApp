var APIurl = "";

var Home = {
    GetApi: "/Home/GetApiURL"
}
//var APISiteUrl = "http://localhost:51984/";

var APIUrl = APISiteUrl + "api/";

var Controller = {
    Login: "Login/",
    Products: "Products/"
}

//var Login = {
//    UserLogin: Controller.Login + "UserLogin"
//}

var LoginURL = {
    InsertRegistration: APIUrl + Controller.Login + "InsertRegistration",
    UserLogin: APIUrl + Controller.Login + "UserLogin"
};

var ProductsURL = {
    InsertUpdateProducts: APIUrl + Controller.Products + "InsertUpdateProducts",
    GetProducts: APIUrl + Controller.Products + "GetProducts",
    GetCurrency: APIUrl + Controller.Products + "GetCurrency",
    DeleteProduct: APIUrl + Controller.Products + "DeleteProduct",
    ViewProduct: APIUrl + Controller.Products + "ViewProduct",
    OrderProduct: APIUrl + Controller.Products + "OrderProduct",
    SearchProduct: APIUrl + Controller.Products + "SearchProduct",
    AddReviewAndRating: APIUrl + Controller.Products + "AddReviewAndRating",
    GetReviewAndRating: APIUrl + Controller.Products + "GetReviewAndRating",
    GetOrders: APIUrl + Controller.Products + "GetOrders",
    RejectOrder: APIUrl + Controller.Products + "RejectOrder"
    //AddReviewAndRating
    //DeleteProduct
}

var ImgPath = APISiteUrl + "Content/ProductImages/";



function GetProducts(CallBack) {
    //tblProducts
    $.ajax({
        url: ProductsURL.GetProducts,
        type: 'Get',
        dataType: 'json',
        async: false,
        success: function (data) {
            CallBack(data);
        }, error: function (err) {
            alert(err);
        }
    });
}


function DescriptionToFixed(desc, len) {
    var description = (desc.length >= len) ? desc.substring(0, len) + '..' : desc;
    return description;
}

function errorDisplay(id, validationFlag) {
    if (validationFlag == ValidationMsg.Failure)
        $(id).css("border-color", "red");
    else
        $(id).css("border-color", "");
}

function LoadDataTable(tableId, descCol) {
    $(tableId).DataTable({ "aaSorting": [[descCol, "desc"]], "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]] });
}

function GetRatingString(ratings) {
    var reviewCount = 0;
    var ratingsString = "";
    ratingsString += "<div>";
    for (var i = 0; i < 5; i++) {
        if (i < ratings) {
            reviewCount = reviewCount + 1;
            ratingsString += '<i class="fa fa-star"></i>';
        } else {
            ratingsString += '<i class="fa fa-star-o"></i>';
        }
    }
    ratingsString += "</div>";

    if (reviewCount <= 3 && reviewCount > 0)
        ratingsString = $(ratingsString).addClass("low-rating")[0].outerHTML;
    else
        ratingsString = $(ratingsString).addClass("high-rating")[0].outerHTML;

    return ratingsString;
}

function validateEmail(eMailId) {
    var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(eMailId)) {
        return true;
    } else {
        return false;
    }
}

function MailValidation(id) {
    var eMailId = $(id).val();
    var validationStatus = validateEmail(eMailId);
    if (validationStatus)
        errorDisplay(id, ValidationMsg.Success);
    else
        errorDisplay(id, ValidationMsg.Failure);
}

function validatePassword(pwd) {
    var filter = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (filter.test(pwd)) {
        return true;
    } else {
        return false;
    }
}

function PasswordValidation(id) {
    var pwd = $(id).val();
    var validationStatus = validatePassword(pwd);
    if (validationStatus)
        errorDisplay(id, ValidationMsg.Success);
    else
        errorDisplay(id, ValidationMsg.Failure);
}

function ConfirmValidation(id, pId) {
    var pwd = $(id).val();
    var cPwd = $(pId).val();

    if (pwd == cPwd)
        errorDisplay(id, ValidationMsg.Success);
    else
        errorDisplay(id, ValidationMsg.Failure);
}