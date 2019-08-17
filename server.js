const express = require('express');

const Projects = require("./data/helpers/projectModel.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Server is up and running!");
})

module.exports = server;
