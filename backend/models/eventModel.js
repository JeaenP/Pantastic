// models/eventModel.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  club: { type: String, required: true },
  image: { type: String, required: true }, // Campo para la URL de la imagen
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
