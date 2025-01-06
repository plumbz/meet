import React, { useState } from 'react';

const NumberOfEvents =({ onNumberChange, defaultNumber = 32 }) => {
    const [eventCount, setEventCount] = useState(defaultNumber);
  
    const handleInputChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setEventCount(value > 0 ? value : defaultNumber);
      onNumberChange(value);
    };
    return (
        <div id="events-number">
        <input
            type="number"
            className="eventCounter"
            placeholder="32"
            value={eventCount}
            onChange={handleInputChange}
             role="textbox"
        />
        </div>
    )

}

export default NumberOfEvents;