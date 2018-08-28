



$(document).ready(function () {
    $.ajax({
        url: ProductsURL.GetProducts,
        type: 'Post',
        dataType: 'json',
        success: function (data) {
           
        }, error: function (err) {
            alert(err);
        }
    });
})