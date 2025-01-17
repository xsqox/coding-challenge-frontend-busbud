import { getDepartures } from './departures';

describe('getDepartures', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should send request to retrieve departures', async () => {
        fetch.mockResponseOnce(JSON.stringify({ departures: [{ id: 1 }] }));
        const data = await getDepartures();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toEqual({ departures: [{ id: 1 }] });
    });

    it('should return null if api request fails', async () => {
        fetch.mockReject(() => Promise.reject('API is down'));
        const data = await getDepartures();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toBeNull();
    });

    it('should pass options as query string', async () => {
        fetch.mockResponseOnce(JSON.stringify({ departures: [{ id: 1 }] }));
        await getDepartures({ cat: 1, dog: 0 });
        expect(fetch).toHaveBeenCalledWith('/api/departures/?cat=1&dog=0');
    });
});
