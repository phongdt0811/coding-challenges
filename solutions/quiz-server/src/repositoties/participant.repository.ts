import mongoose from 'mongoose'

export const PARTICIPANT_COLLECTION_NAME = 'participants'

export const ParticipantSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
});

export default mongoose.model(PARTICIPANT_COLLECTION_NAME, ParticipantSchema);
