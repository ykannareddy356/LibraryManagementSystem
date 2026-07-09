const express = require("express");
console.log("✅ bookRoutes.js loaded");
const { createBook,  getAllBooks, getBookById, updateBook, deleteBook} = require("../controllers/bookController");

const router = express.Router();

//test route to check if book routes are working
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Book routes are working",
  });
});
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