
function Register() {
    var userName = $("#txtUserName").val();
    var firstName = $("#txtFName").val();
    var lastName = $("#txtLName").val();
    var eMailId = $("#txtEMail").val();
    var password= $("#txtPwd").val();
    var confirmPassword = $("#txtCPwd").val();
    var tc = $("#chkTC").is(':checked');


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