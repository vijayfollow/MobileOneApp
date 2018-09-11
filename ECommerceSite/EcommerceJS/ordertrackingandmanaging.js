
$(document).ready(function () {
    AllOrders();
});

function AllOrders() {
    $.ajax({
        url: ProductsURL.GetOrders, 
        type: 'Get',
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#tblOrderTracking").empty();

            $.each(data, function (key, val) {
                $("#tblOrderTracking").append('<tr value=' + val.OrderId + '>' +
                    '<td> ' + val.UserName + ' </td>' +
                    '<td> ' + val.ProductName + ' </td>' +
                    '<td><img class="admin-img-show" src=' + ImgPath + val.ImageName + ' title="' + val.ImageName + '"></td>' +
                    '<td> ' + val.OrderedDate + ' </td>' +
                    '<td> ' + val.DeliveryDate + ' </td>' +
                    '<td>' +
                    GetOrderStatus(val) +
                    //(val.OrderApprove == 0 ? 'Order Rejected' : 'Order Auto Approved') +
                    '</td>' +
                    '<td>' +
                    (val.OrderApprove == 1 && new Date() <= new Date(val.DeliveryDate) ?
                        '<input type="button" class="btn btn-info admin-btn-space" value="Reject Order" onclick="RejectOrder(' + val.OrderId + ')"/>' : '') +
                    '</td>' +

                    '</tr>');

            });

        }, error: function (err) {
            alert(err);
        }
    });
    LoadDataTable("#order-tracking", 2);
}

function GetOrderStatus(val) {
    var OrderStatus = "";
    if (val.OrderApprove == 0)
        OrderStatus = "<label class='Order-Failure'> Order Rejected </label>";
    else if (val.OrderApprove == 1 && new Date() <= new Date(val.DeliveryDate))
        OrderStatus = "<label class='Order-Pending'> Order Auto Approved </label>";
    else
        OrderStatus = "<label class='Order-Succeess'> Order Delivered </label>";

    return OrderStatus;
}


function RejectOrder(orderId) {
    var confirmResult = confirm("Are you sure you want to Reject the Order?");
    if (confirmResult) {
        var OrderData = {
            OrderId: orderId
        }

        $.ajax({
            url: ProductsURL.RejectOrder,
            type: 'POST',
            data: OrderData,
            dataType: 'json',
            success: function (data) {
                AllOrders();
            }, error: function (err) {
                alert(err);
            }
        });
    }
}