// controllers/clubController.js
import userModel from '../models/userModel.js';
import clubModel from '../models/clubModel.js';

export const joinClub = async (req, res) => {
    try {
        const { userId, clubName } = req.body;

        const user = await userModel.findById(userId);
        const club = await clubModel.findOne({ name: clubName });

        if (!user || !club) {
            return res.status(404).json({ message: 'User or Club not found' });
        }

        // Verificar si el usuario ya está en el club
        if (user.clubs.some(c => c.club.equals(club._id))) {
            return res.status(400).json({ message: 'User already in the club' });
        }

        user.clubs.push({ club: club._id, progress: 0 });
        club.members.push(user._id);

        await user.save();
        await club.save();

        res.status(200).json({ message: 'Joined club successfully' });
    } catch (error) {
        console.error('Error joining club:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserClubs = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).populate('clubs.club');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.clubs);
    } catch (error) {
        console.error('Error fetching user clubs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const listClubs = async (req, res) => {
    try {
      const clubs = await clubModel.find({});
      res.json({ success: true, clubs });
    } catch (error) {
      console.error('Error listing clubs:', error);
      res.status(500).json({ success: false, message: 'Error listing clubs' });
    }
  };
