import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';


describe('<NumberOfEvents /> component', () => {
    let onNumberChangeMock;
    beforeEach(() => {
      onNumberChangeMock = jest.fn();
      render(<NumberOfEvents onNumberChange={onNumberChangeMock} />);
    });
  
    test('renders with a textbox input', () => {
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
    });
});