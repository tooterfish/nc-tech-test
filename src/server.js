const express = require('express')
const { getCardById } = require('./controllers/cards-controllers')


const app = express()

app.set('json spaces', 2);

app.get('/cards', async () => {
})

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  getCardById(req, res)
})

module.exports = app
