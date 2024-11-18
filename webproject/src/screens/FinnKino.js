import { useCallback, useEffect } from "react"
import { useFinnkinoContext } from "../context/FinnkinoContext";
import TheaterSelector from "../components/Theaterselector";
import DatePickerComponent from "../components/DatePicker";
import ScheduleTable from "../components/ScheduleTable";
import '../App.css';


const Finnkino = () => {
const { areas, setAreas, selectedArea, setSelectedArea, schedule, setSchedule, startDate, setStartDate } = useFinnkinoContext();


  const getFinnkinoTheaters = useCallback ((xml) => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml,"application/xml")
    const root = xmlDoc.children
    const theatres = root[0].children
    const tempAreas = []
    for (let i = 0; i < theatres.length; i++){
      tempAreas.push(
        {
          "id": theatres[i].children[0].innerHTML,
          "name": theatres[i].children[1].innerHTML
       })
    }
    setAreas(tempAreas)
  }, [setAreas]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.log(`Invalid date format: ${timestamp}`);
      return "Invalid Date";
    }
    return date.toLocaleString("fi-FI", { dateStyle: "medium", timeStyle: "short" });
  };

  const getFinnkinoSchedule = useCallback((xml) => { 
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");
    const shows = xmlDoc.getElementsByTagName("Show");
    const tempSchedule = [];
  
    for (let i = 0; i < shows.length; i++) {
      const show = shows[i];
      const titleElement = show.getElementsByTagName("Title")[0];
      const startTimeElement = show.getElementsByTagName("dttmShowStart")[0];
      const theaterElement = show.getElementsByTagName("Theatre")[0];
  
    if (titleElement && startTimeElement && theaterElement) {
        const title = titleElement.textContent.trim();
        const startTime = startTimeElement.textContent.trim();
        const theater = theaterElement.textContent.trim();
        const formattedStartTime = startTime ? formatDateTime(startTime) : null;

      tempSchedule.push({
        title,
        startTime: formattedStartTime,
        theater,
      });
    } else {
      console.log(`Show ${i} is missing required elements:`, { titleElement, startTimeElement, theaterElement });
    }     
  }
    setSchedule(tempSchedule);
  }, [setSchedule]);

useEffect(() => {
  fetch("https://www.finnkino.fi/xml/TheatreAreas/")
    .then((response) => response.text())
    .then((xml) => getFinnkinoTheaters(xml))
    .catch((error) => console.log(error));
}, [getFinnkinoTheaters]);


useEffect(() => {
  if (selectedArea) {
    const day = String(startDate.getDate()).padStart(2, '0');
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const year = startDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    console.log("Fetching schedule for area:", selectedArea, "on date:", formattedDate);

    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedArea}&dt=${formattedDate}`)
      .then((response) => response.text())
      .then((xml) => getFinnkinoSchedule(xml))
      .catch((error) => console.log(error));
  }
}, [selectedArea, startDate, getFinnkinoSchedule]);

return (
    <div>
    <div className="filter-container">
      <TheaterSelector areas={areas} setSelectedArea={setSelectedArea} />
      <DatePickerComponent startDate={startDate} setStartDate={setStartDate} />    
    </div>
    <ScheduleTable schedule={schedule} /> 
    </div>
  );
};

export default Finnkino;