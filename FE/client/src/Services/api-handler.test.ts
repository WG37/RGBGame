import { getAllGames } from "./api-handler";

// mock api test fetches games from api
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Test Game' }]),
    text: () => Promise.resolve(''), 
  })
) as jest.Mock;

test('getAllGames fetches games from API', async () => {
  const games = await getAllGames();
  expect(games).toEqual([{ id: 1, name: 'Test Game' }]);
  expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/games');
});