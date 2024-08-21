import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    createdBy: mongoose.Types.ObjectId;  // Reference to the user who created the event
    attendees: mongoose.Types.ObjectId[]; // Array of users attending the event
}

const EventSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);
