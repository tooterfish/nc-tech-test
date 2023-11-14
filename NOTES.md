I've decided to convert the project into javascript as I'm much more familiar with it than typescript. I've never implemented a node project in typescript before and I'd have probably spent most of the session wrestling with squigly lines!

sizes.json appears to be a duplicate of cards.json

---

### GET /cards
### 200:
A single test case seems to cover this. Although I could stand to be corrected.

---

### GET cards/:cardId
### 200
Working on the assumption that a card's title could be any string, I decided to test if the returned object has the correct cardId rather than title.

This test could be iterated programatically with a for loop, but I thought it'd be clearer if I wrote each test explicitly in this instance.

Noticed some mismatch between the raw card data and expected response so I've created some helper functions to help handle it.

Also noticed an optional sizeId parameter. but unless I'm mistaken we're not told how to use it, so I'm just ignoring it for now.

### 400
Validation probably not needed as 404 adequetaly covers this case. Included for thoroughness.

---

Using Date.now() to generate unique ID. Outputs an integer so will be compatible with previous tests for cardID

---

### Given more time:
I'd like to make use of routers. Although not strictly necessary in this case they make code a lot tidier and easier to maintain when more endpoints are implemented.

I would've also liked to put error checking into its own controller, for similar reasons as above.
See: https://github.com/tooterfish/BE-NC-News/blob/main/controllers/error-controllers.js
