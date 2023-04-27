const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// allow express to access bundles
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.json('HOME');
});

app.get('/hello-world/', function (req, res) {
  const pathToHtmlFile = path.resolve(
    __dirname,
    '../dist/hello-world-page.html'
  );
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

app.get('/kiwi/', function (req, res) {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/kiwi-page.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

app.listen(3000, function () {
  console.log('Application is running on http://localhost:3000');
});
