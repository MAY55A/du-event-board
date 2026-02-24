export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  regions,
  categories,
}) {
  return (
    <div className="search" id="search">
      <div className="search__container">
        <div className="search__input-wrapper">
          <span className="search__icon">🔍</span>
          <input
            id="search-input"
            type="text"
            className="search__input"
            placeholder="Search events by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="search__select-wrapper">
          <select
            id="region-select"
            className="search__select"
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="search__select-wrapper">
          <select
            id="category-select"
            className="search__select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
