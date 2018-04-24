
var products = require("../data/products");

// Routes
// =============================================================
module.exports = function(app) {

 
  // get my portfolio info
  app.get("/api/products", function(req, res) {
    res.json(products);
  });

  

};

