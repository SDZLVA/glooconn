const Accommodation = require('../models/Accommodation');

// Search accommodations with filters
exports.searchAccommodations = async (req, res) => {
  try {
    const {
      location,
      checkIn,
      checkOut,
      guests,
      priceMin,
      priceMax,
      type,
      amenities,
      rating,
      page = 1,
      limit = 10
    } = req.query;

    // Build query object
    const query = {};
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (type) {
      query.type = type;
    }
    
    if (amenities) {
      query.amenities = { $all: amenities.split(',') };
    }
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    
    if (priceMin || priceMax) {
      query['pricing.basePrice'] = {};
      if (priceMin) query['pricing.basePrice'].$gte = parseFloat(priceMin);
      if (priceMax) query['pricing.basePrice'].$lte = parseFloat(priceMax);
    }

    // Check availability if dates are provided
    if (checkIn && checkOut) {
      query['availability'] = {
        $elemMatch: {
          date: {
            $gte: new Date(checkIn),
            $lte: new Date(checkOut)
          },
          availableRooms: { $gt: 0 }
        }
      };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const accommodations = await Accommodation.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    // Get total count for pagination
    const total = await Accommodation.countDocuments(query);

    res.json({
      data: accommodations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching accommodations:', error);
    res.status(500).json({ error: 'Failed to search accommodations' });
  }
};

// Get accommodation by ID
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.json(accommodation);
  } catch (error) {
    console.error('Error getting accommodation:', error);
    res.status(500).json({ error: 'Failed to get accommodation details' });
  }
};

// Create new accommodation
exports.createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    await accommodation.save();
    res.status(201).json(accommodation);
  } catch (error) {
    console.error('Error creating accommodation:', error);
    res.status(500).json({ error: 'Failed to create accommodation' });
  }
};

// Update accommodation
exports.updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.json(accommodation);
  } catch (error) {
    console.error('Error updating accommodation:', error);
    res.status(500).json({ error: 'Failed to update accommodation' });
  }
};

// Delete accommodation
exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    console.error('Error deleting accommodation:', error);
    res.status(500).json({ error: 'Failed to delete accommodation' });
  }
};

// Add review to accommodation
exports.addReview = async (req, res) => {
  try {
    const { rating, comment, user } = req.body;
    const accommodation = await Accommodation.findById(req.params.id);
    
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    accommodation.reviews.push({
      user,
      rating,
      comment,
      date: new Date()
    });

    // Update average rating
    const totalRating = accommodation.reviews.reduce((sum, review) => sum + review.rating, 0);
    accommodation.rating = totalRating / accommodation.reviews.length;

    await accommodation.save();
    res.json(accommodation);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
}; 