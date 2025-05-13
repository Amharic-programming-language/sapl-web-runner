const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { runSaplCode } = require("./runner");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/run", async (req, res) => {
  const { code, input = "" } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required." });
  }

  try {
    const result = await runSaplCode(code, input);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Execution failed.", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
