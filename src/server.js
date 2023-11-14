const express = require('express')
const { getCards, getCardById, postCard, deleteCardById } = require('./controllers/cards-controllers')


const app = express()
app.use(express.json())

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

app.delete('/cards/:cardId', async (req, res) => {
  deleteCardById(req, res)
})

module.exports = app
