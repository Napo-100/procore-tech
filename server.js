const express = require("express")

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./controllers/"));


app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));