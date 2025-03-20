import React, { useState } from "react";
import "./TreeTable.css";

function TableRow({ node, level, expandedNodes, onToggleExpand }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes[node.id] || false;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  return (
    <>
      <tr
        className={level % 2 === 0 ? "row-even" : "row-odd"}
        style={{ cursor: hasChildren ? "pointer" : "default" }}
        onClick={handleClick}
      >
        <td className="cell-name">
          {hasChildren && (isExpanded ? "▾ " : "▸ ")}
          {node.name}
        </td>
        <td className="cell-email">{node.email}</td>
        <td className="cell-balance">{node.balance}</td>
        <td className="cell-status">{node.isActive ? "Active" : "Inactive"}</td>
      </tr>

      {hasChildren &&
        isExpanded &&
        node.children.map((child) => (
          <TableRow
            key={child.id}
            node={child}
            level={level + 1}
            expandedNodes={expandedNodes}
            onToggleExpand={onToggleExpand}
          />
        ))}
    </>
  );
}

export default function TreeTable({ data }) {
  const [expandedNodes, setExpandedNodes] = useState({});

  const handleToggleExpand = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="tree-table-wrapper">
      <table className="tree-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((node) => (
            <TableRow
              key={node.id}
              node={node}
              level={0}
              expandedNodes={expandedNodes}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
