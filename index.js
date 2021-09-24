const express = require("express"); // using common js modules. Node supports this.
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT);
