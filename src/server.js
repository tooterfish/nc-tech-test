const express = require('express')
const { getCards, getCardById } = require('./controllers/cards-controllers')


const app = express()

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  getCards(req, res)
})

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  getCardById(req, res)
})

module.exports = app
