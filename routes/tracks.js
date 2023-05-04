const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const { validatorGetItem, validatorCreateItem } = require("../validators/tracks");
const { getItems, getItem, deleteItem, updateItem, createItem } = require("../controllers/tracks");
const checkRol = require("../middleware/rol");

//TODO http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Listar todos los items
 */
router.get("/", authMiddleware, getItems);

/**
 * obtener un items xid
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);

/**
 * Listar agregar un item
 */
router.post("/",
    authMiddleware,
    checkRol(["admin"]),
    validatorCreateItem,
    createItem);

/**
 * Actualizar un item
 */
 router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/**
 * Actualizar un item
 */
 router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router