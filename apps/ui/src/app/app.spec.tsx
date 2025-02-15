import { fireEvent, render } from '@testing-library/react';

import App from './app';
import { CreateShortUrlFormIDs } from './pages/constants';
import { shortUrlServer } from '../mocks/server';

describe('App', () => {
  beforeAll(() => {
    shortUrlServer.listen();
  });
  
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText, getByTestId } = render(<App />);

    expect(getByText('Enter the URL to shorten')).toBeTruthy();
    expect(getByTestId(CreateShortUrlFormIDs.longUrlInput)).toBeTruthy();
    expect(getByTestId(CreateShortUrlFormIDs.shortenButton)).toBeTruthy();
  });

  it('should reject and invalid URL', async () => {
    const { getByTestId, findByText } = render(<App />);

    const longUrlInput = getByTestId(CreateShortUrlFormIDs.longUrlInput);
    const shortenButton = getByTestId(CreateShortUrlFormIDs.shortenButton);

    console.log(longUrlInput);
    fireEvent.change(longUrlInput, { target: { value: 'invalid-url' } });
    fireEvent.click(shortenButton);

    expect(await findByText(/Please enter a valid URL/i)).toBeDefined();
  });

  it('should create a short URL', async () => {
    const { getByTestId, findByText } = render(<App />);

    const longUrlInput = getByTestId(CreateShortUrlFormIDs.longUrlInput);
    const shortenButton = getByTestId(CreateShortUrlFormIDs.shortenButton);

    console.log(longUrlInput);
    fireEvent.change(longUrlInput, { target: { value: 'https://www.google.com' } });
    fireEvent.click(shortenButton);

    expect(await findByText(/Success! Here's your short URL:/i)).toBeDefined();
    expect(await findByText("https://short.url/abc1234")).toBeDefined();
    expect(getByTestId(CreateShortUrlFormIDs.shortUrlText)).toBeDefined();
  });
});
