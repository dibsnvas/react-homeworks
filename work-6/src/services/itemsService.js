const BASE_URL = 'https://swapi.dev/api/people';

export async function searchItems(query) {
  const url = query
    ? `${BASE_URL}/?search=${encodeURIComponent(query)}`
    : `${BASE_URL}/?page=1`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }

  const data = await res.json();
  return data.results || [];
}

export async function getItemById(id) {
  const res = await fetch(`${BASE_URL}/${id}/`);

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch character by id');

  return await res.json();
}

export function getIdFromUrl(url) {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : null;
}
