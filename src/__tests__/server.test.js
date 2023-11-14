const request = require('supertest')
const app = require('../server')

describe.only('GET /cards/:cardId', () => {
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