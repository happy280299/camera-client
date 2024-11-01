const ffmpeg = require('ffmpeg-stream');
const http = require('http');

http.createServer((req, res) => {
  const args = ['-f', 'v4l2', '-i', '/dev/video0', '-f', 'mpeg1video', '-b:v', '800k', '-r', '30', '-'];
  const ffmpegProcess = ffmpeg.spawn(args);

  ffmpegProcess.stdout.pipe(res);
}).listen(8080, () => {
  console.log('Streaming video on http://192.168.122.24:8080');
});
