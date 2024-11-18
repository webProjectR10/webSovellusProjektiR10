import React from "react";

const TheaterSelector = ({ areas, setSelectedArea }) => {
  return (
    <div>
      <select onChange={(e) => setSelectedArea(e.target.value)}>
        <option value="">Valitse teatteri</option>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TheaterSelector;