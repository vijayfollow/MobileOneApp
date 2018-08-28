$(document).ready(function () {

    $.ajax({
        url: ProductsURL.GetCurrency,
        type: 'Get',
        dataType: 'json',
        success: function (data) {
            debugger;
            $("#drpCurrency").empty();

            $.each(data, function (key, val) {
                $("#drpCurrency").append('<option value=' + val.CurrencyId + '>' + val.CurrencyName + '</option>');
            });

        }, error: function (err) {
            alert(err);
        }
    });

    GetProducts(AdminProducts);
});


function AdminProducts(data) {
    $("#tblProducts").empty();

    $.each(data, function (key, val) {
        $("#tblProducts").append('<tr value=' + val.ProductId + '>' +
            '<td>' + val.ProductName + '</td>' +
            '<td>' + val.ModelName + '</td>' +
            '<td>' + DescriptionToFixed(val.Description) + '</td>' +
            '<td><input type="button" value="Edit" onclick="EditProduct(' + val.ProductId + ')"/></td>' +
            '<td><input type="button" value="Delete" onclick="DeleteProduct(' + val.ProductId + ')"/></td>' +
            '</tr>');
    });
}



function DeleteProduct(productId) {

    var ProductData = {
        ProductId: productId
    }

    $.ajax({
        url: ProductsURL.DeleteProduct,
        type: 'POST',
        data: ProductData,
        dataType: 'json',
        success: function (data) {
            GetProducts(AdminProducts);
        }, error: function (err) {
            alert(err);
        }
    });
}


function AddProducts() {
    var productName = $("#txtProductName").val();
    var modelName = $("#txtModel").val();
    var price = $("#txtPrice").val();
    var currency = $("#drpCurrency").val();
    var simType = $("#drpSimType").val();
    var batteryCapacity = $("#btrCapacity").val();
    var storage = $("#txtStorage").val();
    var RAM = $("#txtRam").val();
    var description = $("#txtDesc").val();

    //var base64 = getBase64Image(document.getElementById("imageUpload").files[0]);
    debugger;
    var formData = new FormData();
    var file = document.getElementById("imageUpload").files[0];

    formData.append("ProductName", productName);
    formData.append("ModelName", modelName);
    formData.append("Price", price);
    formData.append("Currency", currency);
    formData.append("SimType", simType);
    formData.append("BatteryCapacity", batteryCapacity);
    formData.append("RAM", RAM);
    formData.append("Description", description);
    formData.append("file", file);

    $.ajax({
        type: "POST",
        url: ProductsURL.AddProducts,
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            GetProducts(AdminProducts);
            ClearProductFields();
        },
        error: function (error) {

        }
    });

}

function ClearProductFields() {
    $("#txtProductName").val('');
    $("#txtModel").val('');
    $("#txtPrice").val('');
    $("#drpCurrency").val(1);
    $("#drpSimType").val(1);
    $("#btrCapacity").val('');
    $("#txtStorage").val('');
    $("#txtRam").val('');
    $("#txtDesc").val('');
    //var file = document.getElementById("imageUpload").files[0];
    //file.val('');

}