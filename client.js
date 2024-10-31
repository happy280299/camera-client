const WebSocket = require("ws");
const NodeWebcam = require("node-webcam");

const webcamOpts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  callbackReturn: "buffer",
  verbose: false,
  device: "/dev/video0"
};

const webcam = NodeWebcam.create(webcamOpts);

const ws = new WebSocket("https://camera-nodejs.onrender.com");

ws.on("open", () => {
  console.log("Connected to the Render server");

  // Capture and send image every second
  setInterval(() => {
    webcam.capture("test", (err, data) => {
      if (err) {
        console.error("Error capturing image:", err);
        return;
      }
      ws.send(data.toString("base64"));
    });
  }, 1000);
});

ws.on("error", (err) => {
  console.error("WebSocket error:", err);
});
