import React, { useState } from "react";

export default function ActivityList({ currentLocation, onActivitySelect }) {
  const [hoveredKey, setHoveredKey] = useState(null);

  if (!currentLocation || !activities[currentLocation]) {
    return;
  }

  const acts = activities[currentLocation];

  return (
    <div id="activityList">
      <h3>
        {currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1)}{" "}
        Activities
      </h3>
      {acts.map((activity, index) => {
        const key = `${currentLocation}-${index}`;
        return (
          <div className="activity-container" key={key}>
            <button
              onClick={() => onActivitySelect && onActivitySelect(key)}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="activity-button"
            >
              <span className="info-icon" aria-label="info">
                i
              </span>{" "}
              {activity.icon} {activity.name}
            </button>
            {hoveredKey === key && (
              <div className="description-box">{activity.description}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
