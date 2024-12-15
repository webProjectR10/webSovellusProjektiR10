import React, { useState } from "react";
import '../HomeScreen.css'; 

const ScheduleTable = ({ schedule }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

  const sortedSchedule = [...schedule].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th onClick={() => requestSort('title')}>Title</th>
          <th onClick={() => requestSort('startTime')}>Start Time</th>
          <th onClick={() => requestSort('theater')}>Theater</th>
        </tr>
      </thead>
      <tbody>
        {sortedSchedule.map((show, index) => (
          <tr key={index}>
            <td>{show.title}</td>
            <td>{show.startTime}</td>
            <td>{show.theater}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;