require("@dotenvx/dotenvx").config();
const express = require("express");
const verifyEmail = require("./src/verifyEmail");

const app = express();

app.get("/verify", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email query parameter required." });
  }

  try {
    const result = await verifyEmail(email);
    res.json({ message: "Email verification result.", result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
