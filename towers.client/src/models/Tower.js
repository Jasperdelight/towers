export class Tower {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.ticketCount = data.ticketCount
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}