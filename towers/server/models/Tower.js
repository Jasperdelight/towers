import { Schema } from "mongoose";

export const TowerSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxLength: 150, minLength: 3 },
  description: { type: String, required: true, maxLength: 1000, minLength: 3 },
  coverImg: { type: String, required: true, maxLength: 1000, minLength: 3 },
  location: { type: String, required: true, maxLength: 150, minLength: 3 },
  capacity: { type: Number, required: true, maxLength: 150, minLength: 3 },
  startDate: { type: Date, required: true, maxLength: 50, minLength: 3 },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'misc'], required: true, default: 'misc' },

}, { timestamps: true, toJSON: { virtuals: true } })

TowerSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TowerSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'eventId',
  count: true
})