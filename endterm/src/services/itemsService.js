const BASE_URL = "https://swapi.dev/api/people";

export async function fetchPeople({ query = "", page = 1 } = {}) {
  const url = new URL(BASE_URL);

  url.searchParams.set("page", page);

  if (query) {
    url.searchParams.set("search", query);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data = await res.json();

  return {
    results: data.results || [],
    count: data.count || 0,
    next: data.next || null,
    previous: data.previous || null,
  };
}

export async function getItemById(id) {
  const res = await fetch(`${BASE_URL}/${id}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch character");
  }

  return await res.json();
}

export function getIdFromUrl(url) {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : null;
}

export async function getAll(params) {
  return fetchPeople(params);
}

export async function getById(id) {
  return getItemById(id);
}
