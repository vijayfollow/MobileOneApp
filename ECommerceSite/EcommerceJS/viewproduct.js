
var imgageId = "#productImage";
var prdNameId = "#prdName";
var priceId = "#divPrice";
var descId = "#desc";
var modelNameId = "#tdModelName";
var simTypeId = "#simTypeName";
var ramId = "#tdRam";
var btryId = "#btryName";

$(document).ready(function () {
    var ProductData = {
        ProductId: productId
    }
    $.ajax({
        url: ProductsURL.ViewProduct,
        type: 'Post',
        data: ProductData,
        dataType: 'json',
        success: function (data) {
            $(imgageId).attr("src", ImgPath + data[0].ImageName);
            $(prdNameId).html(data[0].ProductName);
            $(priceId).html(data[0].CurrencyName + " " + data[0].Price);
            $(descId).html(data[0].Description);
            $(modelNameId).html(data[0].ModelName);
            simTypeId == SimType.Single ? $(simTypeId).html("Single") : $(simTypeId).html("Double");
            $(ramId).html(data[0].RAM + "GB");
            $(btryId).html(data[0].BatteryCapacity + "mAh");
            //alert('hi')
            //GetProducts(AdminProducts);
        }, error: function (err) {
            alert(err);
        }
    });
});