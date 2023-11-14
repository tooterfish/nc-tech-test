const { fetchCards, fetchCardById, addNewCard, removeCard } = require('../models/cards-models')

exports.getCards = (req, res) => {
  // console.log('----- getCards')
  fetchCards()
  .then(({cardStubs}) => {
    res.status(200).send(cardStubs)
  })
}

exports.getCardById = (req, res) => {
  // console.log('----- getCardById')

  const { cardId } = req.params
  fetchCardById(cardId)
  .then((card) => {
    res.status(200).send(card)
  })
  .catch((err) => {
    res.status(err.status).send({msg: err.message})
  })
}

exports.postCard = (req, res) => {
  // console.log('----- postCard')
  addNewCard(req.body)
  .then((responseCard) => {
    res.status(201).send(responseCard)
  })
  .catch((err) => {
    res.status(err.status).send({msg: err.message})
  })
}

exports.deleteCardById = (req, res) => {
  const { cardId } = req.params
  // console.log('----- deleteCardById: ' + cardId)
  removeCard(cardId)
  .then(() => {
    res.status(204).send()
  })
  .catch((err) => {
    res.status(err.status).send({msg: err.message})
  })
}