const { getImageUrl, createCardResponse, validateKeys, validateCardId } = require('../models/models-helpers')

describe('getImageUrl', () => {
  test('given an invalid template id return false', () => {
    const result = getImageUrl('template100')
    expect(result).toBe(false)
  })
  test('given a valid template id return corresponding imageUrl', () => {
    const result = getImageUrl('template001')
    expect(result).toBe('/front-cover-portrait-1.jpg')
  })
})

describe('createOutputCard', () => {
  test('given a valid card object return a response object with the appropriate properties', () => {
    const card = {
      "id": "card001",
      "title": "card 1 title",
      "sizes": [
        "sm",
        "md",
        "gt"
      ],
      "basePrice": 200,
      "pages": [
        {
          "title": "Front Cover",
          "templateId": "template001"
        },
        {
          "title": "Inside Left",
          "templateId": "template002"
        },
        {
          "title": "Inside Right",
          "templateId": "template003"
        },
        {
          "title": "Back Cover",
          "templateId": "template004"
        }
      ]
    }
    const expected = 
    {
        card_id: expect.any(String),
        imageUrl: expect.any(String),
        title: expect.any(String),
        availableSizes: expect.any(Array),
        base_price: expect.any(Number),
        pages: expect.any(Array)
    }
    const result = createCardResponse(card)
    expect(result).toEqual(expected)
  })
  test('given a valid card object return a response object with the appropriate availableSizes property', () => {
    const card = {
      "id": "card001",
      "title": "card 1 title",
      "sizes": [
        "sm",
        "md",
        "gt"
      ],
      "basePrice": 200,
      "pages": [
        {
          "title": "Front Cover",
          "templateId": "template001"
        },
        {
          "title": "Inside Left",
          "templateId": "template002"
        },
        {
          "title": "Inside Right",
          "templateId": "template003"
        },
        {
          "title": "Back Cover",
          "templateId": "template004"
        }
      ]
    }
    const expected = [
      {
        "id": "sm",
        "title": "Small"
      },
      {
        "id": "md",
        "title": "Medium"
      },
      {
        "id": "gt",
        "title": "Giant"
      }
    ]
    const result = createCardResponse(card)
    expect(result.availableSizes).toEqual(expected)
  })
  test('given a valid card object return a response object with the appropriate imageUrl property', () => {
    const card = {
      "id": "card001",
      "title": "card 1 title",
      "sizes": [
        "sm",
        "md",
        "gt"
      ],
      "basePrice": 200,
      "pages": [
        {
          "title": "Front Cover",
          "templateId": "template001"
        },
        {
          "title": "Inside Left",
          "templateId": "template002"
        },
        {
          "title": "Inside Right",
          "templateId": "template003"
        },
        {
          "title": "Back Cover",
          "templateId": "template004"
        }
      ]
    }
    const expected = '/front-cover-portrait-1.jpg'
    const result = createCardResponse(card)
    expect(result.imageUrl).toBe(expected)
  })
})

describe('validateKeys', () => {
  test('given an array of keys "cardKeys", return false if cardKeys.length != validKeys.length', () => {
    const result = validateKeys(['a', 'b'])
    expect(result).toBe(false)
  })
  test('given an array of keys "cardKeys", return false if cardKeys and validKeys do not match', () => {
    const result = validateKeys(['title', 'sizes', 'rupees', 'pages'])
    expect(result).toBe(false)
  })
  test('given an array of keys "cardKeys", return true if cardKeys and validKeys match', () => {
    const result = validateKeys(['title', 'sizes', 'basePrice', 'pages'])
    expect(result).toBe(true)
  })
})

describe('validateCardId: a valid cardId is a of "card" + an integer', () => {
  test('given a valid cardId return true', () => {
    const cardId = 'card001'
    const result = validateCardId(cardId)
    expect(result).toBe(true)
  })
  test('given an invalid cardId return false', () => {
    const cardId = 'not-a-card'
    const result = validateCardId(cardId)
    expect(result).toBe(false)
  })
})