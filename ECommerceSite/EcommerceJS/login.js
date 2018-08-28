
function Login() {
    var userName = $("#usrName").val();
    var password = $("#pwd").val();

    var loginData = {
        UserName: userName, Password: password
    }

    $.ajax({
        url: LoginURL.UserLogin,
        type: 'Post',
        dataType: 'json',
        data: loginData,
        success: function (data) {
            alert(data);
            ClearLoginFields();
        }, error: function (err) {
            alert(err);
        }
    });
}

function ClearLoginFields() {
    $("#usrName").val('');
    $("#pwd").val('');
}