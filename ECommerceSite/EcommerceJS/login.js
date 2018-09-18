
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
        url: LoginURL.UserLogin,
        type: 'Get',
        data: loginData,
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                window.location.href = webappUrl + 'Login/UserLogin?UserName=' + data[0].UserName + "&IsAdmin=" + data[0].IsAdmin;
                //if (data[0].IsAdmin == LoginUser.Admin) {
                //    window.location.href = webappUrl + 'Admin/Index?PostData1=' + data[0].UserName + "&PostData2=" + data[0].IsAdmin;
                //    //window.location.href = "../Admin/Index";
                //} else {
                //    window.location.href = webappUrl + 'Customer/Index?PostData1=' + data[0].UserName + "&PostData2=" + data[0].IsAdmin;
                //    //window.location.href = "../Customer/Index";
                //}
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