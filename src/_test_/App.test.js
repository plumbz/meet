import { render, within  } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from './../App';


describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() =>{
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();    
    });
   
    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument(); 
    });

    test('render Number of Events', () => {
        expect(AppDOM.querySelector('#events-number')).toBeInTheDocument(); 
    });
});



describe('<App /> integration', () => {

    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
     
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
     
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
     
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  
     
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          event => event.location === 'Berlin, Germany'
        );

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    });
    test('should handle backspace and typing new value', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const EventNumberDOM = AppDOM.querySelector('#events-number');
        const EventNumberInput = within(EventNumberDOM).queryByRole('textbox');

        // Simulate pressing backspace twice and typing 10
        await user.type(EventNumberInput, '{backspace}{backspace}10');

        // Check if the value of the textbox changes to 10
        expect(EventNumberInput).toHaveValue(10);

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  
        expect(allRenderedEventItems.length).toBe(10);

    });
});