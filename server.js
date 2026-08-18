const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "POST" && req.url === "/api/chat") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);

                res.writeHead(200);
                res.end(JSON.stringify({
                    reply: "MIMI AI Core đã nhận: " + data.message
                }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));
            }
        });

        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Not Found"
    }));
});

server.listen(3000, () => {
    console.log("MIMI AI Core running on port 3000");
});
