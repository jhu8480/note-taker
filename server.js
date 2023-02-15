const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  })
});

app.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'notes.html'), 'utf8', (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  })
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Lisenting on port ${PORT}`)
});