
window.onload = function() {
    $("#shoppingView").hide();
    $("#shoppingCart").hide();
    $("#contactModalButton").hide();
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
                 "<h3 style='color: #CCFFFF;'>"  + name + "</h3>" +
              "<br>" + button +
              "</div>" +
              "</div>"
              )
              
              if (type === "shirt") {
                  $("#shirts").append(panel); 
              }
             else if (type === "mug" || type === "dildo") {
                  $("#mugs").append(panel); 
              }
              else if (type === "customShirt") {
                  $("#customShirt").append(panel); 
              }
              else if (type === "customMug") {
                  $("#customMug").append(panel); 
              }
              
            
        }
        
    });
    
};



// switch view button
    $("#switchView").on("click", function(event) {
       $("#initialView").hide();
       $("#shoppingView").show();
       $("#shoppingCart").show();
       $("#contactModalButton").show();
    });

