export default async function fetchResult(username1, username2) {
  const res = await fetch("http://localhost:5000/battle-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username1, username2 }),
  });

  if (!res.ok) throw new Error("AI request failed");

  return await res.json();
}
