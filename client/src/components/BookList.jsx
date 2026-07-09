
import BookCard from "./BookCard";
import "../styles/bookList.css";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

function BookList({
  books,
  loading,
  setShowModal,
  setSelectedBook,
  handleDelete,
}) {
  if (loading) return <Loader />;

  if (books.length === 0) return <EmptyState />;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
  key={book._id}
  book={book}
  setShowModal={setShowModal}
  setSelectedBook={setSelectedBook}
  handleDelete={handleDelete}
/>
      ))}
    </div>
  );
}

export default BookList;