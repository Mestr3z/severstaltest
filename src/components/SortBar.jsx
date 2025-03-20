import React from "react";
import "./SortBar.css";

export default function SortBar({
  sortField,
  sortDir,
  onSortChange,
  onSortDirChange,
}) {
  return (
    <div className="sort-bar">
      <span className="sort-label">Sort by:</span>

      <button
        className={`sort-button ${sortField === "balance" ? "active" : ""}`}
        onClick={() => onSortChange("balance")}
      >
        Balance
      </button>

      <button
        className={`sort-button ${sortField === "email" ? "active" : ""}`}
        onClick={() => onSortChange("email")}
      >
        Email
      </button>

      <button className="toggle-dir-button" onClick={onSortDirChange}>
        Direction
      </button>
    </div>
  );
}
