const express = require("express");
const app = express();
const port = 3001; // Choose a port number

app.use(express.static("src/functions"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
