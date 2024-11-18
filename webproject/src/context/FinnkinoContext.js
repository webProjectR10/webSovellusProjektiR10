import React, { createContext, useState, useContext } from "react";

const FinnkinoContext = createContext();

export const useFinnkinoContext = () => useContext(FinnkinoContext);

export const FinnkinoProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <FinnkinoContext.Provider value={{ areas, setAreas, selectedArea, setSelectedArea, schedule, setSchedule, startDate, setStartDate }}>
      {children}
    </FinnkinoContext.Provider>
  );
};