import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../mock-data';


const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        let AppComponent;
        given('user hasn’t searched for any city', () => {
            // setup code
        });

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see the list of all upcoming events.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });
   
    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        given('the main page is open', () => {
            // setup code
        });

        when('user starts typing in the city textbox', () => {
            // action code
        });

        then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
            // assertion code
        });
    });
   
    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        given('user was typing “Berlin” in the city textbox', () => {
            // setup code
        });

        and('the list of suggested cities is showing', () => {
            // setup code
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
            // action code
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            // assertion code
        });

        and('the user should receive a list of upcoming events in that city', () => {
            // additional assertions
        });
    });
   
});