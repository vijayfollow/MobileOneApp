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

    //setTimeout(Load(), 1000);

});

function AdminProducts(data) {
    $("#tblProducts").empty();

    $.each(data, function (key, val) {
        $("#tblProducts").append('<tr value=' + val.ProductId + '>' +
            '<td id="prodName' + val.ProductId + '">' + val.ProductName + '</td>' +
            '<td id="modelName' + val.ProductId + '">' + val.ModelName + '</td>' +
            '<td><img id="imgName' + val.ProductId + '" class="admin-img-show" src=' + ImgPath + val.ImageName + ' title="' + val.ImageName + '"></td>' +
            '<td id="desc' + val.ProductId + '">' + DescriptionToFixed(val.Description, 90) + '</td>' +
            '<td>' +
            '<input type="hidden" id="hdnPrice' + val.ProductId + '" value="' + val.Price + '" />' +
            '<input type="hidden" id="hdnCurrencyId' + val.ProductId + '" value="' + val.CurrencyId + '" />' +
            '<input type="hidden" id="hdnSimType' + val.ProductId + '" value="' + val.SimType + '" />' +
            '<input type="hidden" id="hdnRam' + val.ProductId + '" value="' + val.RAM + '" />' +
            '<input type="hidden" id="hdnBtryCapacity' + val.ProductId + '" value="' + val.BatteryCapacity + '" />' +
            '<input type="hidden" id="hdnDesc' + val.ProductId + '" value="' + val.Description + '" />' +
            '<input type="hidden" id="hdnModelId' + val.ProductId + '" value="' + val.ModelId + '" />' +
            '<input type="hidden" id="hdnInternalStorage' + val.ProductId + '" value="' + val.InternalStorage + '" />' +
            '<input type="button" data-toggle="modal" data-target="#editProductModal" class="btn btn-info admin-btn-space" value="Edit" onclick="EditProduct(' + val.ProductId + ')" />' +
            '<input type="button" class="btn btn-info admin-btn-space" value="Delete" onclick="DeleteProduct(' + val.ProductId + ')"/>' +
            '</td>' +
            '</tr>');
    });
    LoadDataTable("#admin-products", 1);
}

function EditProduct(productId) {

    $("#hdnProductId").val(productId);

    var prodName = $("#prodName" + productId).text();
    $("#txtProductName").val(prodName);

    var modelName = $("#modelName" + productId).text();
    $("#txtModel").val(modelName);

    var imgName = $("#imgName" + productId).attr("title");
    $("#img-edit").attr("src", ImgPath + imgName);
    $("#img-edit").attr("title", imgName);
    //$("#imageUpload").val(imgName);

    var price = $("#hdnPrice" + productId).val();
    $("#txtPrice").val(price);

    var currencyId = $("#hdnCurrencyId" + productId).val();
    $("#drpCurrency").val(currencyId);

    var simType = $("#hdnSimType" + productId).val();
    $("#drpSimType").val(simType);

    var RAM = $("#hdnRam" + productId).val();
    $("#txtRam").val(RAM);

    var btryCapacity = $("#hdnBtryCapacity" + productId).val();
    $("#btrCapacity").val(btryCapacity);

    var desc = $("#desc" + productId).text();
    $("#txtDesc").val(desc);

    var modelId = $("#hdnModelId" + productId).val();
    //$("#txtRam").val(RAM);

    var internalStorage = $("#hdnInternalStorage" + productId).val();
    $("#txtStorage").val(internalStorage);
    //hdnInternalStorage

}



function DeleteProduct(productId) {
    var confirmResult = confirm("Are you sure you want to delete?");
    if (confirmResult) {
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
}


function InsertUpdateProducts(Type) {
    var productName = $("#txtProductName").val();
    var modelName = $("#txtModel").val();
    var price = $("#txtPrice").val();
    var currency = $("#drpCurrency").val();
    var simType = $("#drpSimType").val();
    var batteryCapacity = $("#btrCapacity").val();
    var internalStorage = $("#txtStorage").val();
    var RAM = $("#txtRam").val();
    var description = $("#txtDesc").val();
    var file = document.getElementById("imageUpload").files[0];
    var productId = 0;
    var modelId = 0;
    var imgName = "";


    if (Type == InsertUpdateType.Update) {
        productId = $("#hdnProductId").val();
        modelId = $("#hdnModelId" + productId).val();
        if (!file)
            imgName = $("#img-edit").attr("title");
    }

    if (productName)
        errorDisplay("#txtProductName", ValidationMsg.Success);
    else
        errorDisplay("#txtProductName", ValidationMsg.Failure);

    if (modelName)
        errorDisplay("#txtModel", ValidationMsg.Success);
    else
        errorDisplay("#txtModel", ValidationMsg.Failure);

    if (price)
        errorDisplay("#txtPrice", ValidationMsg.Success);
    else
        errorDisplay("#txtPrice", ValidationMsg.Failure);

    if (currency)
        errorDisplay("#drpCurrency", ValidationMsg.Success);
    else
        errorDisplay("#drpCurrency", ValidationMsg.Failure);

    if (simType)
        errorDisplay("#drpSimType", ValidationMsg.Success);
    else
        errorDisplay("#drpSimType", ValidationMsg.Failure);

    if (batteryCapacity)
        errorDisplay("#btrCapacity", ValidationMsg.Success);
    else
        errorDisplay("#btrCapacity", ValidationMsg.Failure);

    if (internalStorage)
        errorDisplay("#txtStorage", ValidationMsg.Success);
    else
        errorDisplay("#txtStorage", ValidationMsg.Failure);

    if (RAM)
        errorDisplay("#txtRam", ValidationMsg.Success);
    else
        errorDisplay("#txtRam", ValidationMsg.Failure);

    if (description)
        errorDisplay("#txtDesc", ValidationMsg.Success);
    else
        errorDisplay("#txtDesc", ValidationMsg.Failure);


    if (Type == InsertUpdateType.Insert) {
        if (file)
            errorDisplay("#imageUpload", ValidationMsg.Success);
        else
            errorDisplay("#imageUpload", ValidationMsg.Failure);
        if (!file)
            return false;
    }


    if (!productName || !modelName || !price || !currency || !simType || !batteryCapacity || !internalStorage || !RAM || !description)
        return false;


    debugger;
    var formData = new FormData();
    formData.append("ProductName", productName);
    formData.append("ModelName", modelName);
    formData.append("Price", price);
    formData.append("Currency", currency);
    formData.append("SimType", simType);
    formData.append("BatteryCapacity", batteryCapacity);
    formData.append("internalStorage", internalStorage);
    formData.append("RAM", RAM);
    formData.append("Description", description);
    formData.append("file", file);
    formData.append("ImageName", imgName);
    formData.append("ProductId", productId);
    formData.append("ModelId", modelId);
    formData.append("InsertUpdateType", Type);


    $.ajax({
        type: "POST",
        url: ProductsURL.InsertUpdateProducts,
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            if (Type == InsertUpdateType.Insert)
                alert("Product Added Successfully");
            else if (Type == InsertUpdateType.Update)
                alert("Product Updated Successfully");
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