// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

module.exports = function(app) {
 
  app.get("/", function(req, res) {
    // If the user already has an account send them to the main page
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


 
  // takes you to the gallery page
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });




};
