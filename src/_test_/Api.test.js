import { getAccessToken } from './../api'; // Replace with actual file path
import { checkToken } from './../api'; // Mock this function
global.fetch = jest.fn(); // Mock fetch globally

describe('getAccessToken', () => {
  beforeEach(() => {
    // Clear mocks before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return the access token if it exists and is valid', async () => {
    // Mock localStorage.getItem to return a valid token
    localStorage.getItem = jest.fn().mockReturnValue('valid_token');
    // Mock checkToken to return a valid response
    checkToken.mockResolvedValue({ error: false });

    const result = await getAccessToken();

    expect(result).toBe('valid_token');
    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    expect(checkToken).toHaveBeenCalledWith('valid_token');
  });

  it('should remove invalid token and fetch auth URL if token is invalid', async () => {
    // Mock localStorage.getItem to return an invalid token
    localStorage.getItem = jest.fn().mockReturnValue('invalid_token');
    // Mock checkToken to return an error
    checkToken.mockResolvedValue({ error: true });

    // Mock fetch to simulate an auth URL response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ authUrl: 'https://authurl.com' }),
    });

    const result = await getAccessToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(fetch).toHaveBeenCalledWith(
      'https://x2dzpnfzte.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
    );
    expect(window.location.href).toBe('https://authurl.com');
  });

  it('should remove invalid token and call getToken with code if code is present in the URL', async () => {
    // Mock localStorage.getItem to return an invalid token
    localStorage.getItem = jest.fn().mockReturnValue('invalid_token');
    // Mock checkToken to return an error
    checkToken.mockResolvedValue({ error: true });

    // Mock searchParams.get to return a valid code
    const mockGet = jest.fn().mockReturnValue('valid_code');
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      get: mockGet,
    }));

    // Mock getToken to resolve with some value
    const getToken = jest.fn().mockResolvedValue('token_from_code');

    const result = await getAccessToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(mockGet).toHaveBeenCalledWith('code');
    expect(getToken).toHaveBeenCalledWith('valid_code');
    expect(result).toBe('token_from_code');
  });

  it('should fetch auth URL if there is no code in URL search params', async () => {
    // Mock localStorage.getItem to return an invalid token
    localStorage.getItem = jest.fn().mockReturnValue('invalid_token');
    // Mock checkToken to return an error
    checkToken.mockResolvedValue({ error: true });

    // Mock searchParams.get to return null (no code)
    const mockGet = jest.fn().mockReturnValue(null);
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      get: mockGet,
    }));

    // Mock fetch to simulate an auth URL response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ authUrl: 'https://authurl.com' }),
    });

    const result = await getAccessToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(mockGet).toHaveBeenCalledWith('code');
    expect(fetch).toHaveBeenCalledWith(
      'https://x2dzpnfzte.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
    );
    expect(window.location.href).toBe('https://authurl.com');
  });
});
