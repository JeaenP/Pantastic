// controllers/eventController.js
import eventModel from '../models/eventModel.js';
import clubModel from '../models/clubModel.js';
import upload from '../config/s3.js';

export const addEvent = async (req, res) => {
  const { name, description, date, clubName, location } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Image is required' });
  }

  try {
    const club = await clubModel.findOne({ name: clubName });
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    const parsedLocation = JSON.parse(location);

    const event = new eventModel({
      name,
      description,
      date,
      club: club._id,
      location: {
        lat: parsedLocation.lat,
        lng: parsedLocation.lng
      },
      image: req.file.location // Usa req.file.location para obtener la URL de la imagen
    });

    await event.save();
    res.json({ success: true, message: 'Event added successfully' });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ success: false, message: 'Error adding event' });
  }
};

export const listEvents = async (req, res) => {
  const { clubId } = req.params;

  try {
    const events = await eventModel.find({ club: clubId });
    res.json({ success: true, events });
  } catch (error) {
    console.error('Error listing events:', error);
    res.status(500).json({ success: false, message: 'Error listing events' });
  }
};

export const removeEvent = async (req, res) => {
  const { id } = req.body;

  try {
    await eventModel.findByIdAndDelete(id);
    res.json({ success: true, message: 'Event removed successfully' });
  } catch (error) {
    console.error('Error removing event:', error);
    res.status(500).json({ success: false, message: 'Error removing event' });
  }
};
