import React, { useState } from 'react';

const NumberOfEvents =({ onNumberChange }) => {
    const [eventCount, setNumber] = useState(32);
  
    const handleChange = (event) => {
        setNumber(event.target.value);
        onNumberChange(event.target.value);
      };
      
    return (
        <div id="events-number">
        <input
            type="number"
            className="eventCounter"
            value={eventCount}
            onChange={handleChange}
             role="textbox"
        />
        </div>
    )

}

export default NumberOfEvents;