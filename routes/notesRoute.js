const fsPro = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await fsPro.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8');
  res.status(200).send(data);
});

router.post('/', async (req, res) => {
  if (req.body.title && req.body.text) {
    const data = await fsPro.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8');
    const array = JSON.parse(data);
    const newObj = {
      title: req.body.title,
      text: req.body.text
    }
    array.push(newObj);
    await fsPro.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(array));
    res.status(201).json({
      status: 'success',
      body: array
    })
  } else {
    res.status(400).json({
      message: 'bad request!'
    })
  }
});

module.exports = router;