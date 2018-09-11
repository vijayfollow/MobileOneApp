
function Register() {
    var userName = $("#txtUserName").val();
    var firstName = $("#txtFName").val();
    var lastName = $("#txtLName").val();
    var eMailId = $("#txtEMail").val();
    var password = $("#txtPwd").val();
    var confirmPassword = $("#txtCPwd").val();
    var tc = $("#chkTC").is(':checked');

    if (userName)
        errorDisplay("#txtUserName", ValidationMsg.Success);
    else
        errorDisplay("#txtUserName", ValidationMsg.Failure);

    if (firstName)
        errorDisplay("#txtFName", ValidationMsg.Success);
    else
        errorDisplay("#txtFName", ValidationMsg.Failure);

    if (lastName)
        errorDisplay("#txtLName", ValidationMsg.Success);
    else
        errorDisplay("#txtLName", ValidationMsg.Failure);

    if (eMailId)
        errorDisplay("#txtEMail", ValidationMsg.Success);
    else
        errorDisplay("#txtEMail", ValidationMsg.Failure);

    if (password)
        errorDisplay("#txtPwd", ValidationMsg.Success);
    else
        errorDisplay("#txtPwd", ValidationMsg.Failure);

    if (confirmPassword)
        errorDisplay("#txtCPwd", ValidationMsg.Success);
    else
        errorDisplay("#txtCPwd", ValidationMsg.Failure);

    if (tc)
        errorDisplay("#chkTC", ValidationMsg.Success);
    else
        errorDisplay("#chkTC", ValidationMsg.Failure);

    if (!userName || !firstName || !lastName || !eMailId || !password || !confirmPassword || !tc || !validateEmail(eMailId) || (password != confirmPassword))
        return false;


    //if (uName && fName && lName && pwd && cPwd && tc) {
    var userData = {
        UserName: userName, FirstName: firstName, LastName: lastName, EMailId: eMailId, Password: password
    }

    $.ajax({
        url: LoginURL.InsertRegistration,
        type: 'Post',
        //dataType: 'json',
        data: userData,
        success: function (data) {
            alert("Registration Successful");
            ClearRegistrationFields();
        }, error: function (err) {
            alert(err);
        }
    });
    //}
}

function ClearRegistrationFields() {
    $("#txtUserName").val('');
    $("#txtFName").val('');
    $("#txtLName").val('');
    $("#txtEMail").val('');
    $("#txtPwd").val('');
    $("#txtCPwd").val('');
    $("#chkTC").removeAttr('checked');
}
