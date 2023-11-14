const cards = require('../data/cards.json')
const templates = require('../data/templates.json')

const { createCardResponse, getImageUrl } = require('./models-helpers')

exports.fetchCards = () => {
  // console.log('----- fetchCards')
  const cardStubs = []
  for (const card of cards) {
    const imageUrl = getImageUrl(card.pages[0].templateId)
    const newElement = {
      title: card.title,
      imageUrl: imageUrl,
      card_id: card.id
    }
    cardStubs.push(newElement)
  }
  return Promise.resolve({cardStubs})
}

exports.fetchCardById = (cardId) => {
  // console.log('----- fetchCardById: ' + cardId)
  const regex = new RegExp(/^card(\d){1,}$/)
  if (!regex.test(cardId)) return Promise.reject({ status: 400, message: `invalid card id: ${cardId}` })

  for (card of cards) {
    if (card.id === cardId) {
      const responseCard = createCardResponse(card)
      return Promise.resolve(responseCard)
    }
  }
  return Promise.reject({status: 404, message: `card ${cardId} not found`})
}

exports.addNewCard = (card) => {
  console.log('----- addNewCard')
  //use a date object to ensure newId is a unique integer
  const newId = 'card' + Date.now()
  const newCard = {
    id: newId,
    ...card
  }
  cards.push(newCard)
  console.log(cards)
  //construct return object
  const outputCard = createOutputCard(newCard)
  return Promise.resolve(outputCard)
}