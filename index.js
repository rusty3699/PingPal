import fetch from "node-fetch";
import express from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Array to store the URLs
const urls = [
    "https://discord-cards.kurizu.repl.co/api/compact/784141856426033233",
    // Add more URLs here
];

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const status = response.status;
        return status;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return console.error;
    }
};

const keepReplAlive = () => {
    // Fetch data for each URL
    urls.forEach((url) => {
        fetchData(url);
    });
};

setInterval(keepReplAlive, 25 * 60 * 1000); // 25 minutes

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/status", async (req, res) => {
    const statusList = {};
    for (const url of urls) {
        const status = await fetchData(url);
        statusList[url] = status;
    }
    res.json(statusList);
});

app.get("/keepalive", (req, res) => {
    res.send("Keep-alive is working!");
});

// export the app for testing
export default app;