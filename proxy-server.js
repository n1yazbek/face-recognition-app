const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000; // You can use any available port

// Enable CORS
app.use(cors());

// Proxy route
app.post("/api/facepp/v3/*", async (req, res) => {
  const faceppUrl = `https://api-us.faceplusplus.com${req.originalUrl.replace(
    "/api",
    ""
  )}`;
  const response = await axios.post(faceppUrl, req.body);
  res.json(response.data);
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
