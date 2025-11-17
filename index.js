import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Reverse proxy pour Jupiter Quote
app.get("/v6/quote", async (req, res) => {
  try {
    const url =
      "https://quote-api.jup.ag/v6/quote?" +
      new URLSearchParams(req.query).toString();

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

// Reverse proxy pour Jupiter Swap
app.post("/v6/swap", async (req, res) => {
  try {
    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log("🔥 Jupiter Proxy is running on port " + PORT);
});
