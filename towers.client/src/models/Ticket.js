export class Ticket {
  constructor(data) {

    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.profile = data.profile
    this.event = data.event
  }
}

let ticketTemplate = {
  "_id": "64c08c57f98b687685a36aa0",
  "eventId": "64c08c56f98b687685a36a9a",
  "accountId": "64adc27a805679e22f660330",
  "createdAt": "2023-07-26T03:00:39.139Z",
  "updatedAt": "2023-07-26T03:00:39.139Z",
  "__v": 0,
  "profile": {
    "_id": "64adc27a805679e22f660330",
    "name": "jspice",
    "picture": "https://s.gravatar.com/avatar/7d9df8ebe6d09b9b2c74c5f862c56af2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjs.png",
    "id": "64adc27a805679e22f660330"
  },
  "id": "64c08c57f98b687685a36aa0"
}