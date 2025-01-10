import React from 'react';
import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';



describe('<Event /> component', () => {
  let EventComponent;
  let event;
  beforeEach(async() => {
    const allEvents = await getEvents();
    event = allEvents[0];
    EventComponent = render(<Event event={allEvents[0]}/>);
  });

  test('renders event location', () => {
    expect (EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test('renders event title', () => {
    expect (EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test('renders event starttime', () => {
    expect (EventComponent.queryByText(event.created)).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    expect (EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  test('by default, event details section should be hidden', () => {
    expect (EventComponent.queryByText(event.description)).not.toBeInTheDocument();
  });

  test('shows the details section when the user clicks on the show details button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show details');
    await user.click(button);
    expect(EventComponent.queryByRole('description')).toBeInTheDocument();
  });

  test('hides event details when user clicks on hide details button', async () => {
    const user = userEvent.setup();
    let button = screen.getByText('show details');
    await user.click(button);
    expect(EventComponent.queryByRole('description')).toBeInTheDocument();
    button = screen.getByText('hide details');
    await user.click(button);
    expect(EventComponent.queryByRole('description')).not.toBeInTheDocument();
  });
});