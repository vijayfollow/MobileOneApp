



function PlaceOrder() {

    var firstName = $("#txtFName").val();
    var lastName = $("#txtLName").val();
    var eMailId = $("#txtEmail").val();
    var mobileNo = $("#txtMobileNo").val();
    var address = $("#txtAddress").val();
    var countryName = $("#drpCountry :selected").text();
    var stateName = $("#drpState :selected").text();
    var cityName = $("#drpCity :selected").text();


    if (firstName)
        errorDisplay("#txtFName", ValidationMsg.Success);
    else
        errorDisplay("#txtFName", ValidationMsg.Failure);

    if (lastName)
        errorDisplay("#txtLName", ValidationMsg.Success);
    else
        errorDisplay("#txtLName", ValidationMsg.Failure);

    if (eMailId)
        errorDisplay("#txtEmail", ValidationMsg.Success);
    else
        errorDisplay("#txtEmail", ValidationMsg.Failure);

    if (mobileNo)
        errorDisplay("#txtMobileNo", ValidationMsg.Success);
    else
        errorDisplay("#txtMobileNo", ValidationMsg.Failure);

    if (address)
        errorDisplay("#txtAddress", ValidationMsg.Success);
    else
        errorDisplay("#txtAddress", ValidationMsg.Failure);

    if (!firstName || !lastName || !eMailId || !mobileNo || !address)
        return false;

    var OrderData = {
        ProductId: productId,
        FirstName: firstName,
        LastName: lastName,
        EMailId: eMailId,
        MobileNo: mobileNo,
        Address: address,
        CountryName: countryName,
        StateName: stateName,
        CityName: cityName
    }

    $.ajax({
        url: ProductsURL.OrderProduct,
        type: 'POST',
        data: OrderData,
        dataType: 'json',
        success: function (data) {
            alert('Order Placed Successfully');
            ClearPlaceOrderFields();
        }, error: function (err) {
            alert(err);
        }
    });
}

function ClearPlaceOrderFields() {
    $("#txtFName").val("");
    $("#txtLName").val("");
    $("#txtEmail").val("");
    $("#txtMobileNo").val("");
    $("#txtAddress").val("");
}



