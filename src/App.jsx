import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

atatus.config('c82cd67b44cf4f069f97fe0e76b1e070').install();

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

 useEffect(() => {
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
      <CitySearch  allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents  onNumberChange={setCurrentNOE}/>
      <EventList events={events} />
    </div>
  );
}



 export default App;
 