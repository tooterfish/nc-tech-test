const { getImageUrl, createCardResponse } = require('../models/models-helpers')

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