import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 20 Now Playing Movies heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/20 Now Playing Movies/i);
  expect(linkElement).toBeInTheDocument();
});
