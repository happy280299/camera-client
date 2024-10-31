const WebSocket = require("ws");
const NodeWebcam = require("node-webcam");

// Configure webcam to return buffer directly
const webcamOpts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  callbackReturn: "buffer", // Ensures data is returned as buffer
  verbose: false,
  device: "/dev/video0"
};

const webcam = NodeWebcam.create(webcamOpts);

// Connect to Render server WebSocket URL
const serverUrl = "https://camera-nodejs.onrender.com"; // Replace with Render server URL
const ws = new WebSocket(serverUrl);

ws.on("open", () => {
  console.log("Connected to the Render server");

  // Capture and send image every second
  setInterval(() => {
    webcam.capture((err, data) => { // No filename needed, as it returns buffer
      if (err) {
        console.error("Error capturing image:", err);
        return;
      }
      ws.send(data.toString("base64")); // Send image data in base64 format
    });
  }, 1000);
});

ws.on("error", (err) => {
  console.error("WebSocket error:", err);
});
