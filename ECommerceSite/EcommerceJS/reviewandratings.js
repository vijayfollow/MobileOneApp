$(document).ready(function () {
    GetReviewsAndRatings();
})

function GetReviewsAndRatings() {
    var ProductData = { ProductId: productId };;
    $.ajax({
        url: ProductsURL.GetReviewAndRating,
        type: 'POST',
        data: ProductData,
        dataType: 'json',
        success: function (data) {
            UpdateReviewAndRatings(data)
        }, error: function (err) {
            alert(err);
        }
    });
}

function UpdateReviewAndRatings(data) {
    $("#ratings-overview").empty();
    $("#comments-overview").empty();
    $("#row-reviewandratings").empty();
    $.each(data, function (key, val) {
        var ratingsString = GetRatingString(val.Ratings);
        $("#row-reviewandratings").append(
            "<tr>" +
            "<td>" + ratingsString + "</td>" +
            "<td>" + val.Comments + "</td>" +
            "</tr>"
        );
        //$("#ratings-overview").append(ratingsString);
        //$("#comments-overview").append("<div>" + val.Comments + " </div>");
    });


}

var CustomerRatings = 5;
function Ratings(Rating) {
    CustomerRatings = Rating;
    var ratingsObj = $(".ratings");
    //$(ratingsObj).removeClass("fa-star-o");
    for (var i = 0; i < ratingsObj.length; i++) {
        if (i <= Rating - 1) {
            $(ratingsObj[i]).removeClass("fa-star-o");
            $(ratingsObj[i]).addClass("fa-star");
        } else {
            $(ratingsObj[i]).removeClass("fa-star");
            $(ratingsObj[i]).addClass("fa-star-o");
        }
    }
}

function ReviewsAndRatings() {

    var comment = $("#txtComment").val();
    if (comment.trim())
        errorDisplay("#txtComment", ValidationMsg.Success);
    else
        errorDisplay("#txtComment", ValidationMsg.Failure);

    if (!comment.trim())
        return false;

    var ReviewsAndRatings = {
        ProductId: productId,
        Ratings: CustomerRatings,
        Comments: comment
    }

    $.ajax({
        url: ProductsURL.AddReviewAndRating,
        type: 'POST',
        data: ReviewsAndRatings,
        dataType: 'json',
        success: function (data) {
            alert("Review and Ratings Inserted Successfully");
            UpdateReviewAndRatings(data);
            CleanUpReviews();

            //GetProducts(AdminProducts);
        }, error: function (err) {
            alert(err);
        }
    });
}

function CleanUpReviews() {
    $("#txtComment").val('');
    var ratingsObj = $(".ratings");
    //$(ratingsObj).removeClass("fa-star-o");
    for (var i = 0; i < ratingsObj.length; i++) {
        $(ratingsObj[i]).removeClass("fa-star");
        $(ratingsObj[i]).addClass("fa-star-o");
    }
}