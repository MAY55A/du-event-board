import { useState, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EventCard from "./components/EventCard";
import events from "./data/events.json";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const regions = useMemo(() => {
    const unique = [...new Set(events.map((e) => e.region))];
    return unique.sort();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(events.map((e) => e.category))];
    return unique.sort();
  }, []);

  const filteredEvents = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return events.filter((event) => {
      // Text search: title, description, tags
      const matchesSearch =
        !term ||
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        (event.tags &&
          event.tags.some((tag) => tag.toLowerCase().includes(term)));

      // Region filter
      const matchesRegion = !selectedRegion || event.region === selectedRegion;

      // Category filter
      const matchesCategory =
        !selectedCategory || event.category === selectedCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchTerm, selectedRegion, selectedCategory]);

  return (
    <>
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        regions={regions}
        categories={categories}
      />
      <main className="main" id="main-content">
        <p className="main__results-info">
          Showing{" "}
          <span className="main__results-count">{filteredEvents.length}</span>{" "}
          event{filteredEvents.length !== 1 ? "s" : ""}
        </p>
        <div className="events-grid" id="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="empty-state" id="empty-state">
              <div className="empty-state__icon">🔎</div>
              <h2 className="empty-state__title">No events found</h2>
              <p className="empty-state__description">
                Try adjusting your search terms or filters to find events near
                you.
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>
          DU Event Board — Built with ❤️ by the community.{" "}
          <a
            href="https://github.com/osl-incubator/du-event-board"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute on GitHub
          </a>
        </p>
      </footer>
    </>
  );
}
