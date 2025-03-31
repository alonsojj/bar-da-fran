const express = require("express");
const clientController = require("../controllers/clientController");
const router = express.Router();

router.get("/", clientController.index);

router.get("/new", clientController.create);
router.post("/new", clientController.store);

router.get("/:id", clientController.edit);
router.put("/:id", clientController.update);
router.delete("/:id", clientController.delete);

module.exports = router;
