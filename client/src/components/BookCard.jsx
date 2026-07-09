import "../styles/bookCard.css";

function BookCard({
  book,
  setShowModal,
  setSelectedBook,
  handleDelete,
}) {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>

      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Year:</strong> {book.publishedYear}</p>
        <p>
          <strong>Status:</strong>{" "}
          {book.available ? "Available" : "Unavailable"}
        </p>
      </div>

      <div className="book-actions">
        <button className="edit-btn"
  onClick={() => {
    setSelectedBook(book);
    setShowModal(true);
  }}
>
  Edit
</button>
        <button
  className="delete-btn"
  onClick={() => handleDelete(book._id)}
>
  Delete
</button>
      </div>
    </div>
  );
}

export default BookCard;