var app,
  server,
  express = require('express'),
  path = require('path'),
  port = process.env.PORT || 5000,
  root = path.resolve(__dirname, 'final');

app = express();
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});
app.use(express.static(root));
server = app.listen(port, serverStarted);

function serverStarted() {
  console.log('Server started', port);
  console.log('Root directory', root);
  console.log('Press Ctrl+C to exit...\n');
}
