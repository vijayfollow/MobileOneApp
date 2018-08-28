
$(document).ready(function () {
    GetProducts(CustomerProducts);
});


function CustomerProducts(data) {
    $("#customerProducts").empty();
    if (data) {
        $.each(data, function (key, val) {
            $("#customerProducts").append(
                '<div class="col-md-3 col-lg-3 col-xs-3 main-div">' +
                '<div onclick="ViewProduct(' + val.ProductId + ')">' +
                '<a title="Extra ₹100 Off">' +
                '<div>' +
                ' <img class="anchor-link product-image" alt="' + val.ImageName + '" src="' + ImgPath + val.ImageName + '">' +
                '</div > ' +
                '</a> ' +
                '<div>&nbsp;</div > ' +
                '<div class="anchor-link"> ' + DescriptionToFixed(val.Description) + '</div > ' +
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
