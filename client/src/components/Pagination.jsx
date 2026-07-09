import "../styles/pagination.css";

function Pagination({ page, totalPages, setPage }) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={page === pageNumber ? "active" : ""}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;