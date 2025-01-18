import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {    
        let AppComponent;       
        given('user is on the main page', () => {                                            
            AppComponent = render(<App />);                                                                                 
        });                                                                                  
                                                                                             
        when('the user did not click on the show details button', () => {                    

        });

        then('the event details should be collapsed and hidden by default', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list'); 
           
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                EventListItems.forEach((item) => {
                    // Ensure the "Show details" button is present
                    const details = within(item).queryByRole('description');
                    expect(details).toBeNull(); // Details should be hidden initially
                }); 
            });
        });
    });

    test('User can expand an event to see details', ({ given, and, when, then }) => {   
        let AppComponent;   
        given('user is on the main page', () => {
            AppComponent = render(<App />);    
        });

        and('the event details are collapsed', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list'); 
 
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
                EventListItems.forEach((item) => {
                    // Ensure the "Show details" button is present  
                    const details = within(item).queryByRole('description');
                    expect(details).toBeNull(); // Details should be hidden initially
                }); 
            });
        });

        when('the user clicks on the event to expand it', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            let button = within(EventListItems[0]).getByText('show details');
            await user.click(button);
        });

        then('the event details should be expanded and visible',  () => {
           
             expect(screen.queryByRole('description')).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details', ({ given, and, when, then }) => {   
        let AppComponent;  
        given('user is on the main page', () => {                                            
            AppComponent = render(<App />);                                                                                     
        });                                                                                  
                                                                                             
        and('the event details are expanded', async () => {                                        
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                let button = within(EventListItems[0]).getByText('show details');
                user.click(button);
            }); 
        });
        
        when('the user clicks on the event to collapse it', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                let button = within(EventListItems[0]).getByText('hide details');
                user.click(button);
            });
               expect(screen.queryByRole('description')).toBeInTheDocument();  
        });

        then('the event details should be collapsed and hidden', async () => {
            await waitFor(() => {
                expect(screen.queryByRole('description')).not.toBeInTheDocument();
            });
        });
    });    
});