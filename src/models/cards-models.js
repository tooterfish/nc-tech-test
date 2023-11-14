const cards = require('../data/cards.json')
const templates = require('../data/templates.json')

const { createCardResponse, getImageUrl, validateKeys } = require('./models-helpers')

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

  for (const card of cards) {
    if (card.id === cardId) {
      const responseCard = createCardResponse(card)
      return Promise.resolve(responseCard)
    }
  }
  return Promise.reject({status: 404, message: `card ${cardId} not found`})
}

exports.addNewCard = (cardBody) => {
  // console.log('----- addNewCard')

  //validate keys of new card
  const cardKeys = Object.keys(cardBody)
  if (!validateKeys(cardKeys)) {
    return Promise.reject({ status: 400, message: 'invalid post body' })
  }

  //use a date object to ensure newId is a unique integer
  const newId = 'card' + Date.now()
  const newCard = {
    id: newId,
    ...cardBody
  }
  cards.push(newCard)
  //construct return object
  const responseCard = createCardResponse(newCard)
  return Promise.resolve(responseCard)
}

exports.removeCard = (cardId) => {
  // console.log('----- removeCard: ' + cardId)
  const regex = new RegExp(/^card(\d){1,}$/)
  if (!regex.test(cardId)) return Promise.reject({ status: 400, message: `invalid card id: ${cardId}` })
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    if (card.id === cardId) {
      // console.log(cards.length)
      // console.log('removing ' + cardId)
      cards.splice(i, 1)
      // console.log(cards.length)
      return Promise.resolve()
    }
  }
  return Promise.reject(
    {
      status: 404, 
      message: `card with id ${cardId} not found`
    })
} 