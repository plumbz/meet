import React, { useState } from 'react';
const Event = ({event}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
      <li className="event">
          <p>{event.summary}</p>
          <p>{event.created}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>
          <button className="detail-btn" onClick={()=>setShowDetails(!showDetails)}>
              { showDetails ? "hide details" : "show details"}
          </button>
          {
              showDetails ?  <p role="description" className="details">{event.eventType}</p> : <></>
          }
      </li>
  );
}
export default Event;