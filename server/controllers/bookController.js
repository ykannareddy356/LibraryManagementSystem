const Book = require("../models/Book");


//post book
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all books
// const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();

//     res.status(200).json({
//       success: true,
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const getAllBooks = async (req, res) => {
  try {
    const allowedSortFields = [
  "title",
  "-title",
  "author",
  "-author",
  "publishedYear",
  "-publishedYear",
];
    const {
      search,
      genre,
      available,
      sort,
      page,
      limit,
    } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (genre) {
      query.genre = genre;
    }

    if (
  available &&
  available !== "true" &&
  available !== "false"
) {
  return res.status(400).json({
    success: false,
    message: "Available must be true or false",
  });
}

if (available) {
  query.available = available === "true";
}

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 5;

    if (pageNumber < 1) {
  return res.status(400).json({
    success: false,
    message: "Page must be greater than 0",
  });
}
if (limitNumber < 1 || limitNumber > 100) {
  return res.status(400).json({
    success: false,
    message: "Limit must be between 1 and 100",
  });
}

    const skip = (pageNumber - 1) * limitNumber;

    const totalBooks = await Book.countDocuments(query);

    let result = Book.find(query);

    if (sort) {
      if (sort && !allowedSortFields.includes(sort)) {
  return res.status(400).json({
    success: false,
    message: "Invalid sort field",
  });
}
      result = result.sort(sort);
    } else {
      result = result.sort("title");
    }

    result = result.skip(skip).limit(limitNumber);

    const books = await result;

    const totalPages = Math.ceil(totalBooks / limitNumber);

    res.status(200).json({
      success: true,
      count: books.length,
      page: pageNumber,
      limit: limitNumber,
      totalBooks,
      totalPages,
      data: books,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get book by id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update book by id
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};