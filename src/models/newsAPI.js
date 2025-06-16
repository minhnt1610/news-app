export async function fetchTopHeadlines(apiKey) {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  if (!res.ok) throw new Error(`Network response was ${res.status}`);
  const data = await res.json();
  return data.articles || [];
}