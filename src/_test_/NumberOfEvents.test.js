import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<NumberOfEvents /> component', () => {
    let onNumberChangeMock;
    let numberOfEventsComponent;

    beforeEach(() => {
      onNumberChangeMock = jest.fn();
      numberOfEventsComponent = render(<NumberOfEvents onNumberChange={onNumberChangeMock} setErrorAlert={() => { }} />);
    });
  
    test('renders with a textbox input', () => {
      const inputElement = numberOfEventsComponent.getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
    });

    test('should have a default value of 32', () => {
        const inputElement = numberOfEventsComponent.getByRole('textbox');
        expect(inputElement).toHaveValue(32); // Test that the default value is 32
      });

    test('should handle backspace and typing new value', async () => {
        const user = userEvent.setup();
        const inputElement = numberOfEventsComponent.getByRole('textbox');
        
        // Simulate pressing backspace twice and typing 10
        await user.type(inputElement, '{backspace}{backspace}10');

        // Check if the value of the textbox changes to 10
        expect(inputElement).toHaveValue(10);

        // Optionally, check if the mock function was called with the correct value
        expect(onNumberChangeMock).toHaveBeenCalledWith('10');
    });
});