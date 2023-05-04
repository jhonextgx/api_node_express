const express = require("express");
const { getItems, getItem, updateItem, deleteItem, createItem } = require("../controllers/storage");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");

//TODO http://localhost:3000/api/storage
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.delete("/:id", validatorGetItem, deleteItem);
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;