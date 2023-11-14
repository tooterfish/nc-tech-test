I've decided to convert the project into javascript as I'm much more familiar with it than typescript.

GET card/:cardId
  200:
    Working on the assumption that a card's title could be any string, I decided to test if the returned object has the correct cardId rather than title.

    This test could be iterated programatically with a for loop, but I thought it'd be clearer if I wrote each test explicitly in this instance.

    Noticed some mismatch between the raw card data and expected output so I've created some helper functions to help handle it.