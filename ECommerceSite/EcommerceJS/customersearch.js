
var prodNames = [];
var minVal = 0;
var maxVal = 100000;
$(document).ready(function () {
    var mastercheck = false;
    // Checkboxes array:
    var checks = [false, false, false, false];

    $('#catagorychk-all').click(function () {
        mastercheck = !mastercheck;
        for (var i = 0; i < checks.length; i++) {
            checks[i] = mastercheck;
        }
        updateCheckboxes();
    });
    $('.search').click(function () {
        prodNames = [];
        var pos = $(this).attr('id').replace('catagorychk-', '');
        checks[pos] = !checks[pos];
        updateCheckboxes();
        $(".search i.fa-check-square").each(function (key, val) {
            var obj = {};
            obj.ProductName = $(this).parent().text().trim();
            prodNames.push(obj);
        });
        SearchProduct();
    });
    function updateCheckboxes() {
        var count = 0;
        for (var i = 0; i < checks.length; i++) {
            if (checks[i]) {
                count++;
                $('#catagorychk-' + i).find('i').removeClass('fa-square');
                $('#catagorychk-' + i).find('i').addClass('fa-check-square');
            } else {
                $('#catagorychk-' + i).find('i').removeClass('fa-check-square');
                $('#catagorychk-' + i).find('i').addClass('fa-square');
            }
        }
        // Tri-state
        if (count === checks.length) {
            mastercheck = true;
            $('#catagorychk-all').find('i').removeClass('fa-square');
            $('#catagorychk-all').find('i').removeClass('fa-minus-square');
            $('#catagorychk-all').find('i').addClass('fa-check-square');
        } else if (count > 0) {
            mastercheck = false;
            $('#catagorychk-all').find('i').removeClass('fa-square');
            $('#catagorychk-all').find('i').removeClass('fa-check-square');
            $('#catagorychk-all').find('i').addClass('fa-minus-square');
        } else {
            mastercheck = false;
            $('#catagorychk-all').find('i').removeClass('fa-minus-square');
            $('#catagorychk-all').find('i').removeClass('fa-check-square');
            $('#catagorychk-all').find('i').addClass('fa-square');
        }
    }
});


function Filter() {
    var value = $("#price-slider").attr("value");
    var rangeSplit = value.split(',');
    minVal = rangeSplit[0];
    maxVal = rangeSplit[1];
    $("#spnStartRange").text(minVal);
    $("#spnEndRange").text(maxVal);
    SearchProduct();
}

$("#price-slider").on("slide", function (slideEvt) {
    var value = $("#price-slider").attr("value");
    var rangeSplit = value.split(',');
    minVal = rangeSplit[0];
    maxVal = rangeSplit[1];
    $("#spnStartRange").text(minVal);
    $("#spnEndRange").text(maxVal);
});

function SearchProduct() {

    if (prodNames.filter(a => a['ProductName'] === 'All').length > 0 || prodNames.length == 0) {
        prodNames = [];
        var obj = {};
        obj.ProductName = 'All';
        prodNames.push(obj);
    }
    var searchItems = {
        ProductNames: prodNames, MinValue: minVal, MaxValue: maxVal
    }

    $.ajax({
        url: ProductsURL.SearchProduct,
        type: 'Post',
        data: searchItems,
        dataType: 'json',
        success: function (data) {
            CustomerProducts(data);
        }, error: function (err) {
            alert(err);
        }
    });
}