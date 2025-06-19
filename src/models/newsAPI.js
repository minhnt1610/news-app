export async function fetchTopHeadlines(apiKey) {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  // Use a public CORS proxy for demo purposes
  const res = await fetch("https://corsproxy.io/?" + encodeURIComponent(url));
  if (!res.ok) throw new Error(`Network response was ${res.status}`);
  const data = await res.json();
  return data.articles || [];
}