window.onload = function() {

    $('#colorsButton').hide();
    $('#wantButton').hide();
    $("#shoppingView").hide();
    $("#shoppingCart").hide();
    $("#contactModalButton").hide();
    $("#sortBy").hide();
    $("#viewShirt").hide();
    $('#scrollUp').hide();
    // get all product info
    $.ajax("/api/products/", {
        type: "GET",
    }).done(function(response) {

        var results = response;
        for (let i = 0; i < results.length; i++) {
            let image = results[i].image;
            let name = results[i].name;
            let type = results[i].type;
            let price = results[i].price;
            let button = results[i].button;

            let panel = $("<div class='product'>").append(
                "<div class='thumbnail'><div class='caption'>" +
                "<img class='productImage' src='" + image + "'>" +
                "<h3 style='color: #CCFFFF;'>" + name + "</h3>" +
                "<br>" + button +
                "</div>" +
                "</div>"
            )

            let panel2 = $("<div class='product'>").append(
                "<div class='thumbnail'><div class='caption'>" +
                "<img class='productImage' src='" + image + "'>" +
                "<h3 style='color: #CCFFFF;'>" + name + "</h3>" +
                "<br>" + button +
                "</div>" +
                "</div>"
            )

            let panel3 = $("<div class='product'>").append(
                "<div class='thumbnail'><div class='caption'>" +
                "<img class='productImage' src='" + image + "'>" +
                "<h3 style='color: #CCFFFF;'>" + name + "</h3>" +
                "<br>" + button +
                "</div>" +
                "</div>"
            )

            let panel4 = $("<div class='product'>").append(
                "<div class='thumbnail'><div class='caption'>" +
                "<img class='productImage' src='" + image + "'>" +
                "<h3 style='color: #CCFFFF;'>" + name + "</h3>" +
                "<br>" + button +
                "</div>" +
                "</div>"
            )

            let panel5 = $("<div class='product'>").append(
                "<div class='thumbnail'><div class='caption'>" +
                "<img class='productImage' src='" + image + "'>" +
                "<h3 style='color: #CCFFFF;'>" + name + "</h3>" +
                "<br>" + button +
                "</div>" +
                "</div>"
            )
            
            let panel6 = $("<div class='product'>").append(
                "<div class='thumbnail'><div class='caption'>" +
                "<img class='productImage' src='" + image + "'>" +
                "<h3 style='color: #CCFFFF;'>" + name + "</h3>" +
                "<br>" + button +
                "</div>" +
                "</div>"
            )

            // fill up these areas and hide them
            if (type === "shirt") {
                $('#shirts').append(panel);
                console.log("added " + name + " to #shirts")
            }
            else if (type === "mug") {
                $('#mugs').append(panel2);
                console.log("added " + name + " to #mugs")
            }
            else if (type === "decal") {
                $('#decals').append(panel3);
                console.log("added " + name + " to #decals")
            }
            else if (type === "original") {
                $('#originals').append(panel4);
                console.log("added " + name + " to #originals")
            }
            else if (type === "custom") {
                $('#custom').append(panel6);
                console.log("added " + name + " to #custom")
            }

            // append to product area
            $('#productArea').append(panel5);
            // hide these      
            $("#shirts").hide();
            $("#mugs").hide();
            $("#decals").hide();
            $("#originals").hide();
            $('#custom').hide();


        }

    });

};



// switch view button
$("#switchView").on("click", function(event) {
    $("#initialView").hide();
    $("#shoppingView").show();
    $("#shoppingCart").show();
    $("#sortBy").show();
    $("#contactModalButton").show();
    $('#viewShirt').show();
    $('#colorsButton').show();
    $('#wantButton').show();
    $('#scrollUp').show();
});


$('#viewShirt').on('click', function() {
    $('#shirtsModal').modal('show')
})
