import React from 'react';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';



describe('<Event /> component', () => {
  let EventComponent;
  let event;
  beforeEach(async() => {
    const allEvents = await getEvents();
    event = allEvents[0];
    EventComponent = render(<Event event={allEvents[0]}/>);
  });

  test('renders event location', () => {
    expect (EventComponent.queryByText(event.location)).toBeInTheDocument;
  });

  test('renders event details button with the title (show details)', () => {
    expect (EventComponent.queryByText('show details')).toBeInTheDocument;
  });

});