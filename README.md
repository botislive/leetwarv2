# ⚔️ LeetWar V2

LeetWar V2 is a full‑stack web application that compares two LeetCode users and determines a "winner" using AI or a smart scoring algorithm. It fetches real LeetCode statistics, analyzes performance, and gives a fair comparison based on rankings, solved problems, and submissions.

---

## 🌐 Live Demo

Frontend → https://leetwarv2.vercel.app/  
Backend → https://leetwarv2-server.vercel.app/

---

## 🚀 Features

• Compare any two LeetCode users instantly
• Fetch live LeetCode stats automatically
• AI‑powered comparison using Gemini
• Fallback scoring system if AI fails
• Clean API structure for frontend integration
• Fully deployable backend (Vercel / Render / Railway)

---

## 🧠 How It Works

1. User enters two LeetCode usernames
2. Backend fetches stats from LeetCode API
3. Data is simplified for analysis
4. Gemini AI compares both users and returns winner + reason
5. If AI fails → deterministic scoring is used

### Scoring Logic (Fallback)

Score = Total Accepted Submissions + (1,000,000 / Ranking)

Higher score wins.

---

## 🛠️ Tech Stack

Frontend:
• React
• Fetch API

Backend:
• Node.js
• Express.js
• node-fetch
• CORS
• dotenv

APIs Used:
• LeetCode Stats API
• Gemini AI API

---

## 📂 Project Structure

```
server/
 ├── index.js
 ├── package.json
 ├── .env

Leetwarv2/
 ├── src/
 ├── App.jsx
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-flash
PORT=5000
```

---

## ▶️ Running Locally

### 1. Clone Repo

```
git clone https://github.com/botislive.git
cd leetwarv2/server
```

### 2. Install Dependencies

```
npm install
```

### 3. Run Server

```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🌐 API Endpoint

### POST /battle-ai

Request:

```
{
  "username1": "user1",
  "username2": "user2"
}
```

Response:

```
{
  "winner": "username",
  "reason": "short explanation",
  "score": { "user1": 123, "user2": 456 }
}
```

---

## ☁️ Deployment Guide

### Vercel

1. Push backend to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

Note: Ensure you export the Express app instead of using `app.listen()` when deploying serverless.

---

## 🎯 Future Improvements

• Add UI leaderboard
• Store battle history in database
• Add charts for comparison
• Support Codeforces / CodeChef users
• Add authentication

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues for suggestions or improvements.

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, give it a star on GitHub and share it with your friends preparing for coding interviews!
