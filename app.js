const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const chatBotAPI = require('./chat.middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.json({
        working: true
    });
});

app.post("/api/chat", async (req, res) => {
    const query = req.body.query;
    const packet = await chatBotAPI(query);
    res.json(packet);
});

app.listen(3000);
console.log("Listening on 3000");