const http = require("http");
const express = require("express");

const port = process.env.PORT || 3000;

express()
  .use(express.static("public"))
  .get("/itunes", (req, res) => {
    // crude proxy to bypass CORS/CORBS browser enforcement
    http
      .request(
        {
          hostname: "itunes.apple.com",
          path: `/search?${Object.keys(req.query)
            .map(r => `${r}=${req.query[r]}`)
            .join("&")}`
        },
        _res => {
          _res.on("data", chunk => res.write(chunk));
          _res.on("end", () => res.end());
        }
      )
      .on("error", e => {
        console.log(e.message);
        res.writeHead(500);
        res.end();
      })
      .end();
  })
  .listen(port, error => {
    if (error) throw error;

    console.log("server is listening on %s", port);

    if (process.env.NODE_ENV !== "production") {
      const { spawn } = require("child_process");

      spawn("rollup", ["-c", "-w"], {
        stdio: "inherit"
      });
    }
  });
