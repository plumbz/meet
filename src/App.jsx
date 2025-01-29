import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';
import * as atatus from 'atatus-spa';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

atatus.config('c82cd67b44cf4f069f97fe0e76b1e070').install();

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {

    let warningText;
    if (navigator.onLine) {   
        // set the warning alert message to a empty string
        warningText = ""

    } else {
      // set the warning alert message to a non-empty string
      warningText = "you are offline! events might not be up to date"
    }
    setWarningAlert(warningText);

    fetchData();
  }, [currentCity,currentNOE]);
  
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }
 

  return (
    <div className="App">
      <div className="alert-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <h2> Meet App </h2>
      <CitySearch  allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents  onNumberChange={setCurrentNOE} setErrorAlert={setErrorAlert}/>
      <EventList events={events} />
    </div>
  );
}



 export default App;
 