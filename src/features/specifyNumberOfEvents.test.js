import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
        let AppComponent;  
        given('user has not specified the number of events to display', () => {

        });

        when('the user views the events', () => {
            AppComponent = render(<App />);
        });

        then(/^(\d+) events should be displayed by default$/, async (arg0) => {                            
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });                                                                                   
        });  
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventNumberDOM;
        let eventNumberInput;
        let EventListItems

        given('user has specified a number of events to display', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            EventNumberDOM = AppDOM.querySelector('#events-number');
            
            const eventNumberInput = within(EventNumberDOM).queryByRole('textbox');  
            await user.type(eventNumberInput, '{backspace}{backspace}10');
        });

        when('the user selects a different number of events to display', () => {
                                    
        });

        then('the system should display the specified number of events', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                
            });  
            expect(EventListItems.length).toBe(10);                                                                                 
        });  
    });
});