

import "../styles/filterBar.css";

function FilterBar({
  search,
  setSearch,
  genre,
  setGenre,
  sort,
  setSort,
  available,
  setAvailable,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="Self Help">Self Help</option>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Newest</option>
        <option value="title">Title A-Z</option>
        <option value="-title">Title Z-A</option>
        <option value="publishedYear">Oldest Year</option>
        <option value="-publishedYear">Newest Year</option>
      </select>

      <select
        value={available}
        onChange={(e) => setAvailable(e.target.value)}
      >
        <option value="">All</option>
        <option value="true">Available</option>
        <option value="false">Unavailable</option>
      </select>
    </div>
  );
}

export default FilterBar;