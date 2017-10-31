var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.







//for the index(/) page,
router.get("/", function(req, res) {
  burger.all(function(data) {//from our burger JS file: function that SELECT * FROM + tableinput 
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject); //render posts to html: index is our handlebars page.
  });
});










//post: submitting form data.
router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "consumed"
  ], [
    req.body.name, req.body.consumed
  ], function(result) {
    // console.log(req.body.consumed);
    // console.log(req.body.name);
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});











router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    consumed: req.body.consumed
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
