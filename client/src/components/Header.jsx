import "../styles/Header.css";

function Header({setShowModal}) {
  return (
    <header className="header">
      <h1>📚 Library Management System</h1>

      <button
  className="add-btn"
  onClick={() => {
    console.log("Button Clicked");
    setShowModal(true);
  }}
>
  + Add Book
</button>
    </header>
  );
}

export default Header;