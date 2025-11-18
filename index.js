// ===========================================================
// Proxy Jupiter V6 — by ChatGPT
// Permet de contourner les problèmes DNS et CORS
// Compatible /v6/quote et /v6/swap
// ===========================================================

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ===========================================================
// Jupiter V6 — URL OFFICIELLE
// ===========================================================
const JUP_API = "https://quote-api.jup.ag";

// ===========================================================
// Route QUOTE
// ===========================================================
app.get("/v6/quote", async (req, res) => {
    try {
        const qs = new URLSearchParams(req.query).toString();
        const url = `${JUP_API}/v6/quote?${qs}`;

        console.log("Proxy → QUOTE:", url);

        const response = await fetch(url, { method: "GET" });
        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error("Erreur QUOTE:", err);
        res.status(500).json({ error: "Proxy error", details: err.toString() });
    }
});

// ===========================================================
// Route SWAP
// ===========================================================
app.get("/v6/swap", async (req, res) => {
    try {
        const qs = new URLSearchParams(req.query).toString();
        const url = `${JUP_API}/v6/swap?${qs}`;

        console.log("Proxy → SWAP:", url);

        const response = await fetch(url, { method: "GET" });
        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error("Erreur SWAP:", err);
        res.status(500).json({ error: "Proxy error", details: err.toString() });
    }
});

// ===========================================================
// Serveur
// ===========================================================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Jupiter Proxy running on port ${PORT}`);
});
