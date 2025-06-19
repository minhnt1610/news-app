export async function fetchTopHeadlines(apiKey) {
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Network response was ${res.status}`);
  const data = await res.json();
  // GNews returns articles in data.articles
  return data.articles || [];
}