import React from "react";

const ScheduleTable = ({ schedule }) => {
  return (
    <table>
      <tbody>
        {schedule.map((show, index) => (
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