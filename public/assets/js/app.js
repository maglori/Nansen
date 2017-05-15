// Get user searches and post them to the itinerary div
function refreshItinerary() {
    console.log("Refreshing itinerary");
    $.ajax({
        type: "GET",
        url: "/user/searches",
        success: function (data) {
            console.log("Got back searches:%j", data);
            var itineraryDiv = $("<div></div>");
            for (var i = 0; i < data.length; i++) {
                itineraryDiv.append($("<p></p>").text(data[i].itinerary_Item));
            }
            $("#itinerary-div").html(itineraryDiv);
        }
    });
}

$(document).ready(function () {
    refreshItinerary();
});
// Yelp Search Code Follows
var search = $("#findtext");
var searchButton = $("#search-button");
searchButton.on("click", function () {

    var queryTerms = {
        "data": search.val().trim()
    };
    $('#findtext').val("");
    event.preventDefault();
    $("#new_Modal_1").foundation("open");

    $.ajax({
        type: "POST",
        url: "/api/yelp",
        data: queryTerms,
        success: function (data) {
            var yelps = data;

            var name1 = yelps[0].name;
            var name2 = yelps[1].name;
            var name3 = yelps[2].name;
            var name4 = yelps[3].name;
            var name5 = yelps[4].name;

            var image1 = yelps[0].image_url;

            $(".checkbox1").prop("value", name1);
            $(".checkbox2").prop("value", name2);
            $(".checkbox3").prop("value", name3);
            $(".checkbox4").prop("value", name4);
            $(".checkbox5").prop("value", name5);

            var image1 = $("<img>");
            var image2 = $("<img>");
            var image3 = $("<img>");
            var image4 = $("<img>");
            var image5 = $("<img>");

            image1.css({
                "height": "60vh"
            });
            image2.css({
                "height": "60vh"
            });
            image3.css({
                "height": "60vh"
            });
            image4.css({
                "height": "60vh"
            });
            image5.css({
                "height": "60vh"
            });

            image1.attr("src", yelps[0].image_url);
            image2.attr("src", yelps[1].image_url);
            image3.attr("src", yelps[2].image_url);
            image4.attr("src", yelps[3].image_url);
            image5.attr("src", yelps[4].image_url);

            $("#display1").html(image1);
            $("#display2").html(image2);
            $("#display3").html(image3);
            $("#display4").html(image4);
            $("#display5").html(image5);

            $("#displayname1").html(name1);
            $("#displayname2").html(name2);
            $("#displayname3").html(name3);
            $("#displayname4").html(name4);
            $("#displayname5").html(name5);
        }
    });
});

// Sending selections back to server

$("#submit-yelps").on("click", function () {
    var selected = [];



    $('.yelp-selection:input:checked').each(function () {
        console.log(this);
        if ($(this).val()) selected.push($(this).val());

        $('.yelp-selection').prop('checked', false);

    });
    console.log("submit yelps %j", selected);
    $.ajax({
        type: "post",
        url: "/user/searches/",
        data: {
            itineraryItem: selected,
            countryDest: ""
        },
        success: function (result) {
            console.log("Finished saving user itinerary");
            refreshItinerary();
            $("#modal-close-button").click();
        }
    });
});
//  Google Geolocator API data
function initMap() {
    var geocoder = new google.maps.Geocoder;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            geocoder.geocode({
                'location': pos
            }, function (results, status) {
                console.log(results);
            });
        });
    };
};
// AJAX for user info
$.ajax({
    type: "GET",
    url: "/api/user",
    success: function (response) {
        var data = response;
        console.log(data);
    }
}).done(function (data) {
    $.ajax({
        type: "POST",
        url: "/api/user",
        data: data,
    });
});