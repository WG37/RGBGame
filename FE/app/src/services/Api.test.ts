import { getAllGames } from "./Api";
import {vi, test, expect } from "vitest";

// mock api test fetches games from api
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Test Game' }]),
    text: () => Promise.resolve(''), 
  })
));

test('getAllGames fetches games from API', async () => {
  const games = await getAllGames();
  expect(games).toEqual([{ id: 1, name: 'Test Game' }]);
  expect(fetch).toHaveBeenCalledWith("/api/games");
});