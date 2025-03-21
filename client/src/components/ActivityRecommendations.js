import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  Search,
  AttachMoney,
  AccessTime,
  LocalActivity,
  Restaurant,
  Museum,
  Park,
  ShoppingCart,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const CategoryIcon = ({ type }) => {
  const icons = {
    Sightseeing: <LocalActivity />,
    Food: <Restaurant />,
    Culture: <Museum />,
    Nature: <Park />,
    Shopping: <ShoppingCart />,
  };
  return icons[type] || null;
};

const ActivityCard = ({ activity }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="160"
          image={`https://source.unsplash.com/random/400x300?${activity.category.toLowerCase()}`}
          alt={activity.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CategoryIcon type={activity.category} sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle2" color="primary">
              {activity.category}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            {activity.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            {activity.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTime sx={{ fontSize: 20, mr: 0.5, color: 'primary.main' }} />
            <Typography variant="body2">
              {activity.duration}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            {activity.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ color: 'success.main', mr: 0.5 }} />
              <Typography variant="h6" color="success.main">
                {activity.price}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
            >
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ActivityRecommendations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const activities = [
    {
      name: 'City Walking Tour',
      category: 'Sightseeing',
      description: 'Explore the city\'s historic landmarks and hidden gems with a local guide.',
      duration: '3 hours',
      price: 30,
      features: ['Local Guide', 'Small Group', 'Historic Sites'],
    },
    {
      name: 'Food Market Tour',
      category: 'Food',
      description: 'Taste local delicacies and learn about regional cuisine.',
      duration: '2 hours',
      price: 45,
      features: ['Food Tasting', 'Local Guide', 'Market Visit'],
    },
    {
      name: 'Museum of Art',
      category: 'Culture',
      description: 'Visit the city\'s premier art museum with guided tour.',
      duration: '2.5 hours',
      price: 25,
      features: ['Guided Tour', 'Audio Guide', 'Special Exhibitions'],
    },
    {
      name: 'Botanical Gardens',
      category: 'Nature',
      description: 'Explore the beautiful gardens and learn about local flora.',
      duration: '1.5 hours',
      price: 15,
      features: ['Self-Guided', 'Garden Map', 'Cafe'],
    },
    {
      name: 'Shopping District Tour',
      category: 'Shopping',
      description: 'Discover the best shopping spots and local boutiques.',
      duration: '2 hours',
      price: 20,
      features: ['Local Guide', 'Shopping Tips', 'Hidden Gems'],
    },
  ];

  const categories = ['all', 'Sightseeing', 'Food', 'Culture', 'Nature', 'Shopping'];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Activities & Attractions
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {categories.map((category) => (
            <Tab
              key={category}
              label={category === 'all' ? 'All Activities' : category}
              value={category}
            />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {activities
          .filter(activity => 
            (selectedCategory === 'all' || activity.category === selectedCategory) &&
            (searchQuery === '' || 
              activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              activity.description.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ActivityCard activity={activity} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ActivityRecommendations; 