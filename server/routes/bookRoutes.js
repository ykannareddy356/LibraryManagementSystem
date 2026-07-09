const express = require("express");
const { createBook,  getAllBooks, getBookById, updateBook, deleteBook} = require("../controllers/bookController");

const router = express.Router();

// POST /api/books
router.post("/", createBook);

// GET /api/books
router.get("/", getAllBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

// PUT /api/books/:id
router.put("/:id", updateBook);

// DELETE /api/books/:id
router.delete("/:id", deleteBook);

module.exports = router;