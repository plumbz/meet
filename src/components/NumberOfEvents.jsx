import React, { useState } from 'react';

const NumberOfEvents =({ onNumberChange, setErrorAlert }) => {
    const [eventCount, setNumber] = useState(32);
  
    const handleChange = (event) => {
        setNumber(event.target.value);
        

        let errorText;
        if ((event.target.value <= 0) || isNaN(event.target.value) ) {
            errorText = "Only positive numbers are allowed"
        } else {
            errorText = ""
            onNumberChange(event.target.value);
        }
        setErrorAlert(errorText);
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