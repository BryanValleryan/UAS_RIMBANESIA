import React from "react";
import "./InventoryModal.css";

export default function InventoryModal({ items, onClose, onUseItem }) {
  return (
    <div className="inventory-overlay">
      <div className="inventory-modal">
        <h2>Inventory</h2>
        {Object.keys(items).length === 0 ? (
          <div>
            <p>Kamu belum memiliki item.</p>
            <br></br>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(items).map(([item, count], index) => {
              const imageName = item.replace(/\s+/g, "-").toLowerCase();

              return (
                <li
                  key={index}
                  onClick={() => onUseItem(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: 10,
                  }}
                >
                  <img
                    src={`/assets/items/${imageName}.png`}
                    alt={item}
                    style={{ width: 32, height: 32, marginRight: 10 }}
                  />
                  <span style={{ fontSize: 16 }}>
                    {item} (x{count})
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <button className="close-button" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}
