
$(document).ready(function () {
    GetProducts(CustomerProducts);
});


function CustomerProducts(data) {
    $("#customerProducts").empty();
    if (data) {
        $.each(data, function (key, val) {
            $("#customerProducts").append(
                '<div class="col-md-6 col-lg-4 col-xs-12 main-div">' +
                '<div onclick="ViewProduct(' + val.ProductId + ')">' +
                '<a title="Extra ₹100 Off">' +
                '<div>' +
                ' <img class="anchor-link product-image" alt="' + val.ImageName + '" src="' + ImgPath + val.ImageName + '">' +
                '</div > ' +
                '</a> ' +
                '<div>&nbsp;</div > ' +
                '<div class="anchor-link"> ' + DescriptionToFixed(val.Description, 20) + '</div > ' +
                '<div class="anchor-link"> ' + '₹ ' + + val.Price + ' </div > ' +
                '</div> ' +
                '</div> '
            );
        });

    }
}

function ViewProduct(productId) {
    window.location.href = "../Customer/ViewProduct?productId=" + productId + "";
}

//$(".search-product").click(function () {

//    var productName = [];

//    var productName = $(this).text().trim();


//    var searchItems = {
//        ProductName: productName
//    }

//    $.ajax({
//        url: "",
//        type: 'Get',
//        dataType: 'json',
//        data: searchItems,
//        success: function (data) {
//        }
//    });

//})