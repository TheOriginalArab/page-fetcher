const request = require("request");
const fs = require("fs");

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error("Please provide both a URL and a local file path.");
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error("Error:", error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Error: HTTP status code ${response.statusCode}`);
    process.exit(1);
  }

  fs.writeFile(filePath, body, (error) => {
    if (error) {
      console.error("Error writing to file:", error);
      process.exit(1);
    }

    const fileSize = Buffer.from(body).length;
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});
