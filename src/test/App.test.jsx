import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the header with the site title", () => {
    render(<App />);
    expect(screen.getByText("DU Event Board")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<App />);
    expect(
      screen.getByText(
        "Discover tech events, meetups, and workshops near your region",
      ),
    ).toBeInTheDocument();
  });

  it("renders event cards", () => {
    render(<App />);
    expect(
      screen.getByText("Python Meetup - Porto Alegre"),
    ).toBeInTheDocument();
    expect(screen.getByText("React Workshop - São Paulo")).toBeInTheDocument();
  });

  it("shows the total events count", () => {
    render(<App />);
    const resultsInfo = screen.getByText(/Showing/);
    expect(resultsInfo).toBeInTheDocument();
    expect(resultsInfo.textContent).toContain("8");
    expect(resultsInfo.textContent).toContain("events");
  });

  it("filters events by search term", () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(
      "Search events by name, description, or tags...",
    );

    fireEvent.change(searchInput, { target: { value: "python" } });

    expect(
      screen.getByText("Python Meetup - Porto Alegre"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Data Science Bootcamp - Rio de Janeiro"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("React Workshop - São Paulo"),
    ).not.toBeInTheDocument();
  });

  it("filters events by region", () => {
    render(<App />);
    const regionSelect = screen.getByDisplayValue("All Regions");

    fireEvent.change(regionSelect, { target: { value: "Porto Alegre" } });

    expect(
      screen.getByText("Python Meetup - Porto Alegre"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("UX Design Workshop - Porto Alegre"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("React Workshop - São Paulo"),
    ).not.toBeInTheDocument();
  });

  it("filters events by category", () => {
    render(<App />);
    const categorySelect = screen.getByDisplayValue("All Categories");

    fireEvent.change(categorySelect, { target: { value: "Education" } });

    expect(
      screen.getByText("Data Science Bootcamp - Rio de Janeiro"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Python Meetup - Porto Alegre"),
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no events match", () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(
      "Search events by name, description, or tags...",
    );

    fireEvent.change(searchInput, {
      target: { value: "xyznonexistentevent" },
    });

    expect(screen.getByText("No events found")).toBeInTheDocument();
  });
});
