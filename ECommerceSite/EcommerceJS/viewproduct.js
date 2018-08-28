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
            //alert('hi')
            //GetProducts(AdminProducts);
        }, error: function (err) {
            alert(err);
        }
    });
});