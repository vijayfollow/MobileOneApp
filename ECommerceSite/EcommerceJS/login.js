
//var input = document.getElementsByTagName("input");

//input.addEventListener("keyup", function (event) {
//    event.preventDefault();
//    if (event.keyCode === 13) {
//        Login();
//    }
//});

function Login() {

    var userName = $("#usrName").val();
    var password = $("#pwd").val();

    if (userName)
        errorDisplay("#usrName", ValidationMsg.Success);
    else
        errorDisplay("#usrName", ValidationMsg.Failure);
    if (password)
        errorDisplay("#pwd", ValidationMsg.Success);
    else
        errorDisplay("#pwd", ValidationMsg.Failure);

    if (!userName || !password)
        return false;

    var loginData = {
        UserName: userName, Password: password
    }

    $.ajax({
        url: "../Login/UserLogin",
        type: 'Get',
        dataType: 'json',
        data: loginData,
        success: function (data) {
            if (data.length > 0) {
                if (data[0].IsAdmin == LoginUser.Admin) {
                    window.location.href = "../Admin/Index";
                } else {
                    window.location.href = "../Customer/Index";
                }
            }
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