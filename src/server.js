const express = require('express')
const { getCards, getCardById, postCard } = require('./controllers/cards-controllers')


const app = express()

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  getCards(req, res)
})

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  getCardById(req, res)
})

app.post('/cards', async (req, res) => {
  postCard(req, res)
})

module.exports = app
