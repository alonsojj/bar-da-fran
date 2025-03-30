const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    res.redirect("/?error" + error);
  }
});

module.exports = router;
