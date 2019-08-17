const express = require('express');

const projectsRouter = require("./projectsRouter.js");

const server = express();

server.use(express.json());

server.use(logger);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send("Server is up and running!");
});

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    console.log(`A ${req.method} request at '${req.url}' at ${timestamp}`);
    next();
};

module.exports = server;
