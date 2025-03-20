import React, { useState, useEffect, useMemo } from "react";
import { rawData } from "./data/data";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";
import TreeTable from "./components/TreeTable";
import "./App.css";

function buildTree(data) {
  const map = {};
  data.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  const roots = [];
  Object.values(map).forEach((node) => {
    if (node.parentId === 0) {
      roots.push(node);
    } else {
      map[node.parentId].children.push(node);
    }
  });
  return roots;
}

function parseBalance(balanceStr) {
  return Number(balanceStr.replace(/[\$,]/g, ""));
}

function filterTree(nodes, filterValue) {
  if (filterValue === "all") return nodes;
  return nodes
    .filter((n) => (filterValue === "active" ? n.isActive : !n.isActive))
    .map((n) => ({
      ...n,
      children: filterTree(n.children, filterValue),
    }));
}

function sortTree(nodes, sortField, sortDir) {
  if (!sortField) return nodes;

  const sorted = [...nodes].sort((a, b) => {
    let valA, valB;
    if (sortField === "balance") {
      valA = parseBalance(a.balance);
      valB = parseBalance(b.balance);
    } else if (sortField === "email") {
      valA = a.email.toLowerCase();
      valB = b.email.toLowerCase();
    }

    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return sorted.map((node) => ({
    ...node,
    children: sortTree(node.children, sortField, sortDir),
  }));
}

export default function App() {
  const [filterValue, setFilterValue] = useState("all");

  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  const treeData = useMemo(() => buildTree(rawData), []);

  const filteredData = useMemo(() => {
    return filterTree(treeData, filterValue);
  }, [treeData, filterValue]);

  const finalData = useMemo(() => {
    return sortTree(filteredData, sortField, sortDir);
  }, [filteredData, sortField, sortDir]);

  const handleSortChange = (field) => {
    setSortField((prevField) => {
      if (prevField === field) {
        return null;
      } else {
        setSortDir("asc");
        return field;
      }
    });
  };

  const handleSortDirChange = () => {
    if (!sortField) return;
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">React table</h1>

      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>

      <FilterBar filterValue={filterValue} onFilterChange={setFilterValue} />

      <SortBar
        sortField={sortField}
        sortDir={sortDir}
        onSortChange={handleSortChange}
        onSortDirChange={handleSortDirChange}
      />

      <TreeTable data={finalData} />
    </div>
  );
}
