import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8000;

app.get("/", (req, res) => {
    console.log(_dirname);
    res.sendFile(_dirname + "/index.html");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/resources", (req, res) => {
    console.log(_dirname);
    res.sendFile(_dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("ok, login info saved!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
