import React from "react";
import "./FilterBar.css";

export default function FilterBar({ filterValue, onFilterChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="filter-select">Sort by </label>
      <select
        id="filter-select"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active only</option>
        <option value="inactive">Inactive only</option>
      </select>
    </div>
  );
}
