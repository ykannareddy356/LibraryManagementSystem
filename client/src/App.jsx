
import './App.css'
import { useEffect, useState } from "react";
import api from "./api/api";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";
import BookModal from "./components/BookModal";


function App() {
  // Filters
const [search, setSearch] = useState("");
const [genre, setGenre] = useState("");
const [sort, setSort] = useState("");
const [available, setAvailable] = useState("");


// Pagination
const [page, setPage] = useState(1);
const [limit] = useState(6);

// UI
const [loading, setLoading] = useState(true);

//modal
const [showModal, setShowModal] = useState(false);
const [refresh, setRefresh] = useState(false);
const [selectedBook, setSelectedBook] = useState(null);

// Data
const [books, setBooks] = useState([]);
const [totalPages, setTotalPages] = useState(1);

// Debounce
const [debouncedSearch, setDebouncedSearch] = useState(search);




//pgination effect to reset page to 1 when filters change
useEffect(() => {
  setPage(1);
}, [search, genre, sort, available]);

//debounce effect to avoid too many api calls
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

//fetch books from api whenever filters change
useEffect(() => {
  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/books", {
        params: {
          search: debouncedSearch,
          genre,
          sort,
          available,
          page,
          limit,
        },
      });

      setBooks(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, [debouncedSearch, genre, sort, available, page, limit, refresh]);


const handleDelete = async (id) => {
 console.log("Deleting book with ID:", id);
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/books/${id}`);

    toast.success("Book deleted successfully!");
    if (books.length === 1 && page > 1) {
      console.log("Last book on the page deleted, moving to previous page.");
    setPage(prev => prev - 1);
    }

    setRefresh(prev => !prev);

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete book."
    );

  }

};
  return (
    <>
      <Header setShowModal={setShowModal} />
      <BookModal
  showModal={showModal}
  setShowModal={setShowModal}
  setRefresh={setRefresh}
  selectedBook={selectedBook}
  setSelectedBook={setSelectedBook}
/>

      <FilterBar
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        sort={sort}
        setSort={setSort}
        available={available}
        setAvailable={setAvailable}
      />

      <BookList
  books={books}
  loading={loading}
  setShowModal={setShowModal}
  setSelectedBook={setSelectedBook}
   handleDelete={handleDelete}
/>

      <Pagination
       page={page}
       totalPages={totalPages}
       setPage={setPage}
      />

      <ToastContainer
      position="top-right"
      autoClose={3000}
   />
    </>
  );
}

export default App;