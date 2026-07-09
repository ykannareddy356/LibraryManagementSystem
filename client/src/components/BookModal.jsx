import { useState,useEffect } from "react";
import { toast } from "react-toastify";


import api from "../api/api";
import "../styles/bookModal.css";

function BookModal({
  showModal,
  setShowModal,
  setRefresh,
  selectedBook,
  setSelectedBook,
}) {
  const initialFormData = {
  title: "",
  author: "",
  genre: "",
  publishedYear: "",
  available: true,
};

const [formData, setFormData] = useState(initialFormData);
const [errors, setErrors] = useState({});
const [submitting, setSubmitting] = useState(false);
 

// Close modal on Escape key press
useEffect(() => {

    const handleEscape = (e) => {

        if(e.key==="Escape"){

            closeModal();

        }

    };

    window.addEventListener("keydown",handleEscape);

    return ()=>{

        window.removeEventListener(
            "keydown",
            handleEscape
        );

    };

},[setShowModal]);


//edit functionality: populate form with selected book data when modal opens
useEffect(() => {
  if (selectedBook) {
    setFormData({
      title: selectedBook.title,
      author: selectedBook.author,
      genre: selectedBook.genre,
      publishedYear: selectedBook.publishedYear,
      available: selectedBook.available,
    });

    setErrors({});
  } else {
    setFormData(initialFormData);
  }
}, [selectedBook]);
  // Don't render the modal if it's closed
  if (!showModal) return null;

  const closeModal = () => {
  setShowModal(false);
  setSelectedBook(null);
  setFormData(initialFormData);
  setErrors({});
};
  // Handle all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

     setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
  };


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setSubmitting(true);

    if (selectedBook) {
      // UPDATE
      await api.put(`/books/${selectedBook._id}`, formData);
      toast.success("Book updated successfully!");
    } else {
      // CREATE
      await api.post("/books", formData);
      toast.success("Book added successfully!");
    }

    // Refresh book list
    setRefresh((prev) => !prev);

    closeModal();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      `Failed to ${selectedBook ? "update" : "add"} book.`
    );
  } finally {
    setSubmitting(false);
  }
};

//validation
const validateForm = () => {
  const newErrors = {};

  if (!formData.title.trim()) {
    newErrors.title = "Title is required";
  }

  if (!formData.author.trim()) {
    newErrors.author = "Author is required";
  }

  if (!formData.genre) {
    newErrors.genre = "Genre is required";
  }

  if (!formData.publishedYear) {
    newErrors.publishedYear = "Published year is required";
  } else if (
    formData.publishedYear < 1000 ||
    formData.publishedYear > new Date().getFullYear()
  ) {
    newErrors.publishedYear = "Enter a valid year";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  return (
    <div className="modal-overlay"
      onClick={closeModal}
    >
      <div className="modal"
      onClick={(e)=>e.stopPropagation()}
      >
        <h2>{selectedBook ? "Edit Book" : "Add New Book"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
             <p className="error">{errors.title}</p>
            )}
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
            />
            {errors.author && (
             <p className="error">{errors.author}</p>
            )}
          </div>

          <div className="form-group">
            <label>Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Self Help">Self Help</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
            </select>
            {errors.genre && (
             <p className="error">{errors.genre}</p>
            )}
          </div>

          <div className="form-group">
            <label>Published Year</label>
            <input
              type="number"
              name="publishedYear"
              placeholder="Enter published year"
              value={formData.publishedYear}
              onChange={handleChange}
            />
            {errors.publishedYear && (
             <p className="error">{errors.publishedYear}</p>
            )}
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

          <button
  type="submit"
  disabled={submitting}
className="submit-btn">
  {submitting
    ? selectedBook
      ? "Updating..."
      : "Adding..."
    : selectedBook
      ? "Update Book"
      : "Add Book"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookModal;