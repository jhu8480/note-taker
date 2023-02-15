const fsPro = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');

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
      text: req.body.text,
      id: uuid()
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

router.delete('/:id', async (req, res) => {
  let idExist = false;
  const idToDelete = req.params.id;
  console.log(idToDelete);
  const data = await fsPro.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8');
  const array = JSON.parse(data);
  
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === idToDelete) {
      idExist = true;
    }
  }

  if (idExist) {
    const newArray = array.filter((el) => el.id !== idToDelete);
    console.log(newArray);
    await fsPro.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(newArray));
    res.json({
      status: "success",
      message: "item deleted!"
    })
  } else {
    res.status(400).json({
      status:"fail",
      message: "bad request: id not found"
    })
  }
  
});

module.exports = router;