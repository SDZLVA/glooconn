const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['hotel', 'hostel', 'apartment', 'resort', 'villa', 'guesthouse'],
    default: 'hotel'
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  description: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  images: [{
    url: String,
    caption: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    discounts: [{
      type: {
        type: String,
        enum: ['seasonal', 'early_bird', 'last_minute']
      },
      percentage: Number,
      validFrom: Date,
      validTo: Date
    }]
  },
  availability: [{
    date: Date,
    availableRooms: Number,
    price: Number
  }],
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String,
    minimumStay: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for common search queries
accommodationSchema.index({ location: 1 });
accommodationSchema.index({ 'pricing.basePrice': 1 });
accommodationSchema.index({ rating: -1 });

// Update the updatedAt field on save
accommodationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation; 