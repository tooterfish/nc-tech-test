const request = require('supertest')
const app = require('../server')

describe('GET /cards', () => {
  test('200: responds with array of card stubs', async () => {
    const expected = [
      {
        "title": "card 1 title",
        "imageUrl": "/front-cover-portrait-1.jpg",
        "card_id": "card001"
      },
      {
        "title": "card 2 title",
        "imageUrl": "/front-cover-portrait-2.jpg",
        "card_id": "card002"
      },
      {
        "title": "card 3 title",
        "imageUrl": "/front-cover-landscape.jpg",
        "card_id": "card003"
      }
    ]
    const response = await request(app).get('/cards')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expected)
  })
})

describe('GET /cards/:cardId', () => {
  test('200: responds with card object with matching cardID', async () => {
    let response;
    let cardId;

    cardId = 'card001'
    response = await request(app).get(`/cards/${cardId}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      card_id: cardId,
    }))

    cardId = 'card002'
    response = await request(app).get(`/cards/${cardId}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      card_id: cardId,
    }))
  })

  test('200: response object has appropriate properties', async () => {
    const cardId = 'card001'
    const expected = 
    {
      card_id: expect.any(String),
      imageUrl: expect.any(String),
      title: expect.any(String),
      availableSizes: expect.any(Array),
      base_price: expect.any(Number),
      pages: expect.any(Array)
    }
    const response = await request(app).get(`/cards/${cardId}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expected)
  })

  test('200: response object has appropriate availableSizes property', async () => {
    const cardId = 'card001'
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
    const response = await request(app).get(`/cards/${cardId}`)
    expect(response.body.availableSizes).toEqual(expected)
  })

  test('200: response object has appropriate imageUrl property', async () => {
    const cardId = 'card003'
    const expected = '/front-cover-landscape.jpg'
    const response = await request(app).get(`/cards/${cardId}`)
    expect(response.status).toBe(200)
    expect(response.body.imageUrl).toBe(expected)
  })

  test('404: card with given id not found', async () => {
    const cardId = 'card100'
    const response = await request(app).get(`/cards/${cardId}`)
    expect(response.status).toBe(404)
    expect(response.body.msg).toBe(`card ${cardId} not found`)
  })

  test('400: given card ID not valid', async () => {
    const cardId = 'not-a-card'
    const response = await request(app).get(`/cards/${cardId}`)
    expect(response.status).toBe(400)
    expect(response.body.msg).toBe(`invalid card id: ${cardId}`)
  })
})

describe('POST /cards', () => {
  test('201: respond with the appropriate new card object', async () => {
    const body = {
      "title": "example title",
      "sizes": [
        "sm",
        "md",
        "gt"
      ],
      "basePrice": 200,
      "pages": [
        {
          "title": "Front Cover",
          "templateId": "template006"
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
    const expected = {
      "title": "example title",
      "imageUrl": "/front-cover-landscape.jpg",
      "card_id": expect.any(String),
      "base_price": 200,
      "availableSizes": [
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
      ],
      "pages": [
          {
            "title": "Front Cover",
            "templateId": "template006"
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
    const response = await request(app).post('/cards')
    .send(body)
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expected)
  })
  test('400: post body is invalid', async () => {
    const body = {}
    const response = await request(app).post('/cards')
    .send(body)
    expect(response.status).toBe(400)
    expect(response.body.msg).toBe('invalid post body')
  })
})

describe('DELETE /cards:cardId', () => {
  test('204: card successfully deleted', async () => {
    const cardId = 'card001'
    const response = await request(app).delete(`/cards/${cardId}`)
    expect(response.status).toBe(204)
  })
  test('404: card with given id not found', async () => {
    const cardId = 'card100'
    const response = await request(app).delete(`/cards/${cardId}`)
    expect(response.status).toBe(404)
    expect(response.body.msg).toBe(`card with id ${cardId} not found`)
  })
  test('400: given card id is invalid', async () => {
    const cardId = 'not-a-card'
    const response = await request(app).delete(`/cards/${cardId}`)
    expect(response.status).toBe(400)
    expect(response.body.msg).toBe(`invalid card id: ${cardId}`)
  })
})