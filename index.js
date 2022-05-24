const http = require("http");
const logger = require("./utils/logger");
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 8001;

// Capture 404
app.use((req, res) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

// capture error
app.use((err, req, res) => {
    res.status(500).send(err);
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl } - ${req.method} - ${req.ip}`);
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    logger.info(`Server started and running on ${PORT}`);
});