const templates = require('../data/templates.json')

getImageUrl = (templateId) => {
  // console.log('----- get img url')
  for (template of templates) {
    if (template.id === templateId) return template.imageUrl
  }
  return false
}

createCardResponse = (card) => {
  const sizeMap = {
    'sm': 'Small',
    'md': 'Medium',
    'gt': 'Giant'
  }
  const availableSizes = []
  for (const size of card.sizes) {
    availableSizes.push(
      {
        id: size,
        title: sizeMap[size]
      }
    )
  }

  const newCard = {
    title: card.title,
    imageUrl: getImageUrl(card.pages[0].templateId),
    card_id: card.id,
    availableSizes: availableSizes,
    base_price: card.basePrice,
    pages: [...card.pages]
  }
  return newCard
}

validateKeys = (cardKeys) => {
  // console.log('--------- validate keys')
  const validKeys = ['title', 'sizes', 'basePrice', 'pages']
  if (cardKeys.length != validKeys.length) return false
  for(key of cardKeys) {
    if (!validKeys.includes(key)) return false
  }
  return true
}

module.exports = { createCardResponse, getImageUrl, validateKeys }