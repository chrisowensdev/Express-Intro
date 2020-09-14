'use strict';
const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const express = require('express');
const app = express();

const server = http.createServer(app);
const db = require('./db');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

const rootController = (req, res) => {
    const snippet = `<h1>Hello from the Root Route!</h1>`;
    res
        .status(200)
        .send(snippet)
        .end();
}

const fooController = (req, res) => {
    const snippet = `<h1>This is the FOO CONTROLLER</h1>`;
    res
        .status(200)
        .send(snippet)
        .end();
}

const helloController = (req, res) => {
    console.log("Our request parameters", req.params);
    let snippet = `<h1>Hello There!</h1>`;
    if (req.params.name !== undefined) {
        snippet = `<h1> Hello ${req.params.name}</h1>`;
    }
    res
        .status(200)
        .send(snippet)
        .end();
}

const monsterController = (req, res) => {
    let snippet = `<h1> BOOO!!!!</h1>`;

    if (req.params.name === undefined && db !== undefined) {
        snippet += `<ul>`;
        db.map(monster => {
            snippet += `<li><a href="/monster/${monster.slug}">${monster.name}</a></li>`;
        });
        snippet += '</ul>';
    }

    if (req.params.name !== undefined) {
        db.map(monster => {
            if (req.params.name === monster.slug) {
                snippet = `<h1>BOOO!!! It is ${monster.name}</h1>
                    <p> I am ${monster.name}</p>
                    <p> Species: ${monster.species}`;
            }
        })
    }
    res
        .status(200)
        .send(snippet)
        .end();
}

app.get('/', rootController); // <- ROOT route
app.get('/foo', fooController); // <- FOO route
app.get('/hello/:name?', helloController); // <- HELLO route
app.get('/monster/:name?', monsterController);