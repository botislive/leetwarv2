import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // If Node <18
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

async function fetchLeetCodeUser(username) {
  const response = await fetch(`https://leetcode-api-pied.vercel.app/user/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${username}`);
  }
  const userData = await response.json();
  if (userData.status === "error") {
    throw new Error(`User not found: ${username}`);
  }
  return userData;
}

// --- POST /battle-ai ---
app.post("/battle-ai", async (req, res) => {
  try {
    let { data1, data2, username1, username2 } = req.body;

    if ((!data1 || !data2) && username1 && username2) {
      [data1, data2] = await Promise.all([
        fetchLeetCodeUser(username1),
        fetchLeetCodeUser(username2),
      ]);
    }

    if (!data1 || !data2) {
      return res.status(400).json({ error: "Missing user data or usernames" });
    }

    // --- Slim down data for AI / scoring ---
    const slim1 = {
      username: data1.username,
      ranking: data1.profile.ranking,
      solutionCount: data1.profile.solutionCount,
      acSub: data1.submitStats.acSubmissionNum,
    };
    const slim2 = {
      username: data2.username,
      ranking: data2.profile.ranking,
      solutionCount: data2.profile.solutionCount,
      acSub: data2.submitStats.acSubmissionNum,
    };

    // --- Try AI call (Gemini) ---
    let winnerData;
    try {
      const geminiApiKey = process.env.GEMINI_API_KEY;
      const geminiModel = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      if (!geminiApiKey) {
        throw new Error("GEMINI_API_KEY is missing in server/.env");
      }

      const prompt = `
Compare these two users and return ONLY valid JSON:
{
  "winner": "<username>",
  "reason": "<short explanation>",
  "score": { "user1": number, "user2": number }
}

User1: ${JSON.stringify(slim1)}
User2: ${JSON.stringify(slim2)}
`;

      const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
          },
        }),
      });

      const result = await aiRes.json().catch(() => ({}));

      if (!aiRes.ok) {
        const apiMessage = result?.error?.message || aiRes.statusText;
        throw new Error(`Gemini ${aiRes.status}: ${apiMessage}`);
      }

      const aiTextRaw = result?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("\n");

      if (aiTextRaw) {
        let aiText = aiTextRaw;
        aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
        winnerData = JSON.parse(aiText);
      } else {
        throw new Error("Gemini returned no candidate text");
      }
    } catch (err) {
      console.error("AI failed, using scoring:", err.message);
    }

    // --- If AI failed or unavailable, use deterministic scoring ---
    if (!winnerData) {
      const ac1 = Array.isArray(slim1.acSub) ? slim1.acSub : [];
      const ac2 = Array.isArray(slim2.acSub) ? slim2.acSub : [];

      const score1 =
        (ac1.reduce((sum, s) => sum + (s.count || 0), 0) || 0) +
        (slim1.ranking ? 1000000 / slim1.ranking : 0); // higher ranking = smaller number, invert
      const score2 =
        (ac2.reduce((sum, s) => sum + (s.count || 0), 0) || 0) +
        (slim2.ranking ? 1000000 / slim2.ranking : 0);

      winnerData = {
        winner: score1 > score2 ? slim1.username : slim2.username,
        reason: "Winner determined by submissions and ranking",
        score: { user1: score1, user2: score2 },
      };
    }

    res.json(winnerData);
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
