const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

exports.runSaplCode = (code, input = "") => {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(__dirname, `temp_${uuid()}.sapl`);
    fs.writeFileSync(tempFilePath, code, "utf-8");

    const exePath = path.join(__dirname, "sapl.exe");
    const proc = spawn("wine", [exePath, tempFilePath], { timeout: 5000 });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (data) => (stdout += data.toString()));
    proc.stderr.on("data", (data) => (stderr += data.toString()));

    proc.on("close", (code) => {
      fs.unlinkSync(tempFilePath); // Clean up temp file
      resolve({
        output: stdout.trim(),
        error: stderr.trim(),
        exitCode: code,
      });
    });

    proc.on("error", (err) => {
      fs.unlinkSync(tempFilePath);
      reject(err);
    });

    if (input) {
      proc.stdin.write(input + "\n");
    }
    proc.stdin.end();
  });
};
