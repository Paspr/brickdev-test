import { hostname, getContainerName } from "./dirty_hack.js";
import { createServer } from "http";


const PORT = 8000;
const AUTHOR = "Pavel";


// Get container name
const containerName = getContainerName(hostname);

// Extract replica number from container name
const match = containerName ? containerName.match(/brick-app-(\d+)$/) : null;
const UUID = match ? match[1] : "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/hostname" && req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify({ hostname: hostname }));
    } 
    else if (req.url === "/author" && req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify({ author: AUTHOR }));
    } 
    else if (req.url === "/id" && req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify({ uuid: UUID }));
    } 
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} with UUID: ${UUID}`);
});